import { RoomCardSkeleton } from "@/components/room/room-card-skeleton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RoomCardSkeleton> = {
  title: "Components/RoomCardSkeleton",
  component: RoomCardSkeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RoomCardSkeleton>;
export const Default: Story = {};
