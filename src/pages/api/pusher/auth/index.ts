import { NextApiRequest, NextApiResponse } from "next";

import Pusher from "pusher";

import { pusherServer } from "@/lib/pusher";
import { z } from "zod";

// Define the schema for input validation
const schema = z.object({
  socket_id: z.string(),
  channel_name: z.string(),
  username: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Pusher.UserAuthResponse | void> {

  const { socket_id, channel_name, username } = req.body;
  
  const randomString = Math.random().toString(36).slice(2);
  const presenceData = {
    user_id: randomString,
    user_info: {
      username: "@" + username,
    },
  };


  try {
    const auth = pusherServer.authorizeChannel(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (error) {
    console.error(error);
    res.send(500)
  }
}