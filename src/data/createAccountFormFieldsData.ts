export type CreateAccountFormFieldDataType = {
  fieldName: "username" | "password";
  type: string;
  placeholder?: string;
};

// This is just a labels data to display on ui
export const createAccountFormFieldsData: CreateAccountFormFieldDataType[] = [
  {
    fieldName: "username",
    type: "text",
    placeholder: "John Doe",
  },
  {
    fieldName: "password",
    type: "password",
  },
];
