import type { Meta, StoryObj } from "@storybook/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"; // Optional: For triggering toasts
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";

const meta: Meta<typeof Toaster> = {
  title: "Components/ui/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster /> {/* Ensure the Toaster is rendered in the story */}
      </>
    ),
  ],
};

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Default Toast",
              description: "This is a default toast.",
            });
          }}
        >
          Show Default Toast
        </Button>
      </div>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Destructive Toast",
              description: "This is a destructive toast.",
              variant: "destructive",
            });
          }}
        >
          Show Destructive Toast
        </Button>
      </div>
    );
  },
};

export const Success: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Success Toast",
              description: "This is a success toast!",
              variant: "success", // Use the success variant
            });
          }}
        >
          Show Success Toast
        </Button>
      </div>
    );
  },
};
export const WithDarkTheme: Story = {
  render: () => {
    const { toast } = useToast();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
      <ThemeProvider defaultTheme={isDarkTheme ? "dark" : "light"}>
        <div>
          <Button
            onClick={() => {
              toast({
                title: "Default Toast",
                description: "This is a default toast.",
              });
            }}
          >
            Show Default Toast
          </Button>
          <Button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            style={{ marginLeft: "10px" }}
          >
            Toggle Theme ({isDarkTheme ? "Dark" : "Light"})
          </Button>
        </div>
      </ThemeProvider>
    );
  },
};
export default meta;
