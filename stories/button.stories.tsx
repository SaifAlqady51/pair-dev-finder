import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Button> = {
  title: "Components/ui/button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "sm",
    onClick: action("default click"),
    children: "Default button",
    className: "shadow-lg",
  },
};
export const Link: Story = {
  args: {
    variant: "link",
    size: "sm",
    onClick: action("default click"),
    children: "Link button",
    className: "shadow-lg",
  },
};
export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    onClick: action("default click"),
    children: "Ghost button",
    className: "shadow-lg",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "sm",
    onClick: action("default click"),
    children: "Destructive button",
    className: "shadow-lg",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    onClick: action("default click"),
    children: "Outline button",
    className: "shadow-lg",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    onClick: action("default click"),
    children: "Secondary button",
    className: "shadow-lg",
  },
};
