import { useState, useRef, useEffect } from "react";
import Pusher, { PresenceChannel } from "pusher-js";
import { Message } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

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

      // Optimistic update
      setMessages((prev) => [...prev, { ...newMessage }]);

      // Send via Pusher
      channelRef.current.trigger("client-message", newMessage);
    }
  };

  // Function to mark messages as seen
  const markMessagesAsSeen = (messageIds: string[]) => {
    if (!channelRef.current || !isConnected) return;

    // Filter out messages that belong to the current user
    const messagesToMark = messageIds.filter((id) => {
      const message = messages.find((msg) => msg.id === id);
      return message && message.userId !== userId;
    });

    if (messagesToMark.length === 0) return;

    // Update local state first
    setMessages((prev) =>
      prev.map((msg) =>
        messagesToMark.includes(msg.id) && !msg.seenBy?.includes(userId)
          ? { ...msg, seenBy: [...(msg.seenBy || []), userId] }
          : msg,
      ),
    );

    // Notify other users
    const seenEvent: SeenEvent = {
      messageIds: messagesToMark,
      userId,
    };

    channelRef.current.trigger("client-messages-seen", seenEvent);
  };

  // Function to get unread messages
  const getUnreadMessages = () => {
    const filteredMessages = messages.filter(
      (msg) => msg.userId !== userId && !msg.seenBy?.includes(userId),
    );
    return filteredMessages;
  };

  useEffect(() => {
    pusherRef.current = new Pusher(process.env.PUSHER_KEY!, {
      authEndpoint: "/api/pusher/auth",
      auth: {
        params: { username: username, userId: userId },
      },
      cluster: "eu",
    });

    channelRef.current = pusherRef.current.subscribe(
      `presence-${roomId}`,
    ) as PresenceChannel;

    channelRef.current.bind("pusher:subscription_succeeded", () => {
      setIsConnected(true);
    });

    channelRef.current.bind("client-message", (message: Message) => {
      setMessages((prev) => {
        {
          return [...prev, { ...message }];
        }
      });
    });
    channelRef.current.bind("client-messages-seen", (event: SeenEvent) => {
      setMessages((prev) =>
        prev.map((msg) =>
          event.messageIds.includes(msg.id) &&
            !msg.seenBy?.includes(event.userId)
            ? { ...msg, seenBy: [...(msg.seenBy || []), event.userId] }
            : msg,
        ),
      );
    });
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
