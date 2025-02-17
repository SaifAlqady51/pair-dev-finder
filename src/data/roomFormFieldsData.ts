export type RoomFormFieldDataType = {
  fieldName: "name" | "keywords" | "description" | "githubRepo" | "image";
  label: string;
  placeholder?: string;
  "data-cy"?: string;
};

// This is just a labels data to display on ui
export const roomFormFieldsData: RoomFormFieldDataType[] = [
  {
    fieldName: "name",
    label: "name  *",
    placeholder: "John Doe",
    "data-cy": "create-room-form-name-field",
  },
  {
    fieldName: "description",
    placeholder: "Talk about your room purpose, goals, etc.",
    label: "description  *",
    "data-cy": "create-room-form-description-field",
  },
  {
    fieldName: "keywords",
    label: "Keywords",
    placeholder: "Technologies used (e.g., TypeScript, React)",
    "data-cy": "create-room-form-tags-field",
  },
  {
    fieldName: "githubRepo",
    label: "github repo",
    placeholder: "https:/github.com/user/repo",
    "data-cy": "create-room-form-github-link-field",
  },
  {
    fieldName: "image",
    label: "Room Image",
    placeholder: "https://image.com/image.jpg",
    "data-cy": "create-room-form-image-field",
  },
];
