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
  tags: "example,story,room",
  githubRepo: "https://github.com/example/repo",
  userId: "user123",
  created_at: new Date(),
};

export const Default: Story = {
  args: {
    room,
  },
};
