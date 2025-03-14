export type LoginFormDataType = {
  fieldName: "email" | "password";
  type: "text" | "password";
  placeholder?: string;
  "data-cy": string;
};

// This is just a labels data to display on ui
export const loginFormFieldsData: LoginFormDataType[] = [
  {
    fieldName: "email",
    type: "text",
    placeholder: "John Doe",
    "data-cy": "login-email-field",
  },
  {
    fieldName: "password",
    type: "password",
    "data-cy": "login-password-field",
  },
];
