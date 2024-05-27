
export type FullRegisterFormFieldDataType = {
    fieldName:"username" | "password";
    type:string;
    placeholder?:string;
}

// This is just a labels data to display on ui 
export const fullRegisterFormFieldsData: FullRegisterFormFieldDataType[] = [
    {
        fieldName: "username",
        type: "text",
        placeholder:"John Doe",
    },
    {
        fieldName: "password",
        type: "password",
    },
]