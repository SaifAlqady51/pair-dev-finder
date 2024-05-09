export type formFieldDataType = {
    fieldName:"username" | "language" | "description" | "githubRepo";
    label:string;
    fieldDescription:string;
    placeholder?:string;
}

// This is just a labels data to display on ui 
export const formFieldsData: formFieldDataType[] = [
    {
        fieldName: "username",
        label: "usename",
        fieldDescription: "This is you public display key",
        placeholder:"John Doe",
    },
    {
        fieldName: "description",
        label: "description",
        fieldDescription: "This is your room descirption",
    },
    {
        fieldName: "language",
        label: "Primary language",
        fieldDescription: "This is the primary language used in your project",
    },
    {
        fieldName: "githubRepo",
        label: "github repo",
        fieldDescription: "This is your public Github repo url",
    } 
]