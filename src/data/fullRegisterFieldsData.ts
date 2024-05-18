
export type FullRegisterFormFieldDataType = {
    fieldName:"username" | "password";
    label:string;
    placeholder?:string;
}

// This is just a labels data to display on ui 
export const fullRegisterFormFieldsData: FullRegisterFormFieldDataType[] = [
    {
        fieldName: "username",
        label: "username",
        placeholder:"John Doe",
    },
    {
        fieldName: "password",
        label: "password",
    },
]