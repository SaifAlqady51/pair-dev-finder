import { useState, useRef, useEffect } from "react";
import Pusher, { PresenceChannel } from "pusher-js";
import { Message } from "@/db/schema";

type UseChatProps = {
  userId: string;
  username: string;
  roomId: string;
  message: string; // This is the prop you want to use
};

export const useChat = ({
  userId,
  username,
  roomId,
  message: initialMessage, // Renamed to avoid conflict with state
}: UseChatProps) => {
  Pusher.logToConsole = true;
  const [messages, setMessages] = useState<Message[]>([]);
  console.log(messages);
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
          // Check if message already exists to prevent duplicates
          if (
            !prev.some(
              (m) =>
                m.content === message.content &&
                m.userId === message.userId &&
                new Date(m.createdAt).getTime() -
                new Date(message.createdAt).getTime() <
                1000,
            )
          ) {
            return [...prev, { ...message, id: Date.now().toString() }];
          }
          return prev;
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
