export type RoomFormFieldDataType = {
  fieldName: "name" | "tags" | "description" | "githubRepo" | "image";
  label: string;
  placeholder?: string;
};

// This is just a labels data to display on ui
export const roomFormFieldsData: RoomFormFieldDataType[] = [
  {
    fieldName: "name",
    label: "name",
    placeholder: "John Doe",
  },
  {
    fieldName: "description",
    placeholder: "Talk about your room purpose, goals, etc.",
    label: "description",
  },
  {
    fieldName: "tags",
    label: "Tags",
    placeholder: "Technologies used (e.g., TypeScript, React)",
  },
  {
    fieldName: "githubRepo",
    label: "github repo",
    placeholder: "https:/github.com/user/repo",
  },
  {
    fieldName: "image",
    label: "Room Image",
    placeholder: "https://image.com/image.jpg",
  },
];
