import { useState, useRef, useEffect } from "react";
import Pusher, { PresenceChannel } from "pusher-js";
import { v4 as uuidv4 } from "uuid";
import { createPusherClient } from "@/lib/pusher-client";
import { Message } from "@/types/messageType";

type UseChatProps = {
  userId: string;
  username: string;
  roomId: string;
};

type SeenEvent = {
  messageIds: string[];
  userId: string;
};

export const useChat = ({ userId, username, roomId }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, { ...message }]);
  };

  const updateSeenStatus = (messageIds: string[], seenByUserId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        messageIds.includes(msg.id) && !msg.seenBy?.includes(seenByUserId)
          ? { ...msg, seenBy: [...(msg.seenBy || []), seenByUserId] }
          : msg,
      ),
    );
  };

  const sendMessage = (content: string) => {
    if (channelRef.current && isConnected) {
      const newMessage: Message = {
        id: uuidv4(),
        userId,
        content,
        createdAt: new Date(),
        roomId,
        seenBy: [],
      };
      addMessage(newMessage);
      channelRef.current.trigger("client-message", newMessage);
    }
  };

  const markMessagesAsSeen = (messageIds: string[]) => {
    if (!channelRef.current || !isConnected) return;

    const messagesToMark = messageIds.filter((id) => {
      const message = messages.find((msg) => msg.id === id);
      return message && message.userId !== userId;
    });

    if (messagesToMark.length === 0) return;

    updateSeenStatus(messagesToMark, userId);

    const seenEvent: SeenEvent = {
      messageIds: messagesToMark,
      userId,
    };

    channelRef.current.trigger("client-messages-seen", seenEvent);
  };

  const getUnreadMessages = () => {
    const filteredMessages = messages.filter(
      (msg) => msg.userId !== userId && !msg.seenBy?.includes(userId),
    );
    return filteredMessages;
  };

  useEffect(() => {
    pusherRef.current = createPusherClient(userId, username);
    channelRef.current = pusherRef.current.subscribe(
      `presence-${roomId}`,
    ) as PresenceChannel;

    channelRef.current.bind("pusher:subscription_succeeded", () => {
      setIsConnected(true);
    });

    channelRef.current.bind("client-message", (message: Message) =>
      addMessage(message),
    );
    channelRef.current.bind("client-messages-seen", (event: SeenEvent) =>
      updateSeenStatus(event.messageIds, event.userId),
    );
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        channelRef.current.unsubscribe();
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, [roomId, userId, username]);

  return {
    messages,
    isConnected,
    sendMessage,
    markMessagesAsSeen,
    getUnreadMessages,
  };
};
