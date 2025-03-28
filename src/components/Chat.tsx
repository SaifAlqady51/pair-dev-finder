"use client";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";

type ChatProps = {
  userId: string;
  username: string;
  roomId: string;
};

export const Chat: React.FC<ChatProps> = ({ userId, username, roomId }) => {
  const [message, setMessage] = useState("");
  console.log(message);
  const { messages, isConnected, sendMessage } = useChat({
    userId,
    username,
    roomId,
    message,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  // const handleKeyDown = () => {
  //   startTyping();
  // };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat Room</h2>
        <p className="text-sm text-gray-500">
          {isConnected ? "Connected ✅" : "Connecting..."}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.userId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              <div>{msg.content}</div>
              <div className="text-xs mt-1 opacity-70">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
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
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
