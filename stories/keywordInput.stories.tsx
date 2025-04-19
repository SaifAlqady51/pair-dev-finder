import { Meta, StoryObj } from "@storybook/react";
import {
  KeywordsInput,
  KeywordsInputProps,
} from "@/components/forms/KeywordsInput";
import { useState } from "react";

const meta: Meta<typeof KeywordsInput> = {
  title: "Components/KeywordsInput",
  component: KeywordsInput,
  argTypes: {
    placeholder: { control: "text" },
    maxKeywords: { control: { type: "number", min: 1, max: 20 } },
  },
};
export default meta;

type Story = StoryObj<typeof KeywordsInput>;

// Create a wrapper component that manages the field state
const KeywordsInputWrapper = (props: Omit<KeywordsInputProps, "field">) => {
  const [keywords, setKeywords] = useState<string[]>([]);

  const field = {
    value: keywords,
    onChange: setKeywords,
  };

  return <KeywordsInput {...props} field={field} />;
};

export const Default: Story = {
  render: (args) => <KeywordsInputWrapper {...args} />,
  args: {
    placeholder: "Add a skill",
    maxKeywords: 10,
    suggestions: ["typescript", "react", "nextjs", "vuejs"],
  },
};

export const CustomLabels: Story = {
  render: (args) => <KeywordsInputWrapper {...args} />,
  args: {
    placeholder: "Enter category",
    maxKeywords: 5,
    suggestions: [],
  },
};

export const LimitedTags: Story = {
  render: (args) => <KeywordsInputWrapper {...args} />,
  args: {
    placeholder: "Enter interest",
    maxKeywords: 3,
    suggestions: [],
  },
};
