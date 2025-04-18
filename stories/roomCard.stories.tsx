import { Meta, StoryObj } from "@storybook/react";
import { Room } from "@/db/schema";
import { RoomCard } from "@/components";

const meta: Meta<typeof RoomCard> = {
  title: "Components/RoomCard",
  component: RoomCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RoomCard>;

const room: Room = {
  id: "1",
  name: "Example Room",
  description: "This is an example room.",
  keywords: [],
  githubRepo: "https://github.com/example/repo",
  userId: "user123",
  created_at: new Date(),
  image:
    "https://media.mobidev.biz/2024/08/red-green-refactoring-2.jpg?strip=all&lossy=1&ssl=1",
};

export const Default: Story = {
  args: {
    room,
  },
};
