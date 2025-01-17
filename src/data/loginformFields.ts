export type LoginFormDataType = {
  fieldName: "email" | "password";
  type: "text" | "password";
  placeholder?: string;
};

// This is just a labels data to display on ui
export const loginFormFieldsData: LoginFormDataType[] = [
  {
    fieldName: "email",
    type: "text",
    placeholder: "John Doe",
  },
  {
    fieldName: "password",
    type: "password",
  },
];
