export type Message = {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: Date;
  seenBy: string[];
};
