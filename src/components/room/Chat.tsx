"use client";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useChat } from "@/hooks/useChat";
import { useUnreadMessagesCounter } from "../providers";

type ChatProps = {
  userId: string;
  username: string;
  roomId: string;
};

export const Chat: React.FC<ChatProps> = ({ userId, username, roomId }) => {
  const [message, setMessage] = useState("");
  const {
    messages,
    isConnected,
    sendMessage,
    markMessagesAsSeen,
    getUnreadMessages,
  } = useChat({
    userId,
    username,
    roomId,
  });

  const { setUnreadMessagesCount } = useUnreadMessagesCounter();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const seenMessageIds = useRef<Set<string>>(new Set());

  const observeMessage = useCallback(
    (el: HTMLDivElement | null, messageId: string) => {
      if (!el || seenMessageIds.current.has(messageId)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              markMessagesAsSeen([messageId]);
              seenMessageIds.current.add(messageId);
              observer.disconnect();
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.6,
        },
      );

      observer.observe(el);

      // Cleanup function
      return () => observer.disconnect();
    },
    [markMessagesAsSeen],
  );

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as seen when they become visible
  //
  useEffect(() => {
    const unreadMessages = getUnreadMessages();
    setUnreadMessagesCount(unreadMessages.length);
  }, [messages]);
  useEffect(() => {
    const unreadMessages = getUnreadMessages();

    if (unreadMessages.length > 0) {
      markMessagesAsSeen(unreadMessages.map((msg) => msg.id));
    }
  }, []);

  return (
    <div className="flex flex-col h-full ">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat Room</h2>
        <p className="text-sm text-gray-500">
          {isConnected ? "Connected " : "Connecting..."}
        </p>
      </div>

      <div className="flex-auto overflow-y-scroll">
        <div className="p-4 space-y-1 ">
          {messages.map((msg) => {
            const isUnread =
              msg.userId !== userId && !(msg.seenBy || []).includes(userId);
            const ref = isUnread
              ? (el: HTMLDivElement | null) => observeMessage(el, msg.id)
              : undefined;
            return (
              <div
                ref={ref}
                key={msg.id}
                data-message-id={msg.id}
                className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg p-2 flex gap-1 ${msg.userId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                    }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {msg.userId === userId && (
                    <div className="flex space-x-1">
                      {msg.seenBy && msg.seenBy.some((id) => id !== userId) ? (
                        <span className="text-xs text-white">✓✓</span>
                      ) : (
                        <span className="text-xs text-white opacity-50">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/*
      {typingUsers.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500 italic">
          {typingUsers.length === 1
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.length} people are typing...`}
        </div>
      )}
*/}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg w-6 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
