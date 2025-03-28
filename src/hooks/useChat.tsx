import { useState, useRef, useEffect } from "react";
import Pusher, { PresenceChannel } from "pusher-js";
import { Message } from "@/db/schema";

type UseChatProps = {
  userId: string;
  username: string;
  roomId: string;
};

export const useChat = ({ userId, username, roomId }: UseChatProps) => {
  Pusher.logToConsole = true;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);

  const sendMessage = (content: string) => {
    if (channelRef.current && isConnected) {
      const newMessage: Omit<Message, "id"> = {
        userId,
        content,
        createdAt: new Date(),
        roomId,
      };

      // Add the message to local state immediately
      setMessages((prev) => [
        ...prev,
        { ...newMessage, id: Date.now().toString() },
      ]);

      // Send the message via Pusher
      channelRef.current.trigger("client-message", newMessage);
    }
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

    channelRef.current.bind(
      "client-message",
      (message: Omit<Message, "id">) => {
        setMessages((prev) => {
          {
            return [...prev, { ...message, id: Date.now().toString() }];
          }
        });
      },
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
  };
};
