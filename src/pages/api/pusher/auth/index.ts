import { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";

interface AuthRequest {
  socket_id: string;
  channel_name: string;
  username: string;
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { socket_id, channel_name, username, userId } =
    req.body as Partial<AuthRequest>;

  if (!socket_id || !channel_name || !username || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const presenceData = {
    user_id: userId,
    user_info: { username: `@${username}` },
  };

  try {
    const auth = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      presenceData,
    );
    return res.json(auth);
  } catch (error) {
    console.error("Pusher authorization error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
