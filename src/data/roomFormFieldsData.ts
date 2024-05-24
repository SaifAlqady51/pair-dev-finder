export type RoomFormFieldDataType = {
    fieldName:"name" | "tags" | "description" | "githubRepo";
    label:string;
    fieldDescription:string;
    placeholder?:string;
}

// This is just a labels data to display on ui 
export const roomFormFieldsData: RoomFormFieldDataType[] = [
    {
        fieldName: "name",
        label: "name",
        fieldDescription: "This is you public display key",
        placeholder:"John Doe",
    },
    {
        fieldName: "description",
        label: "description",
        fieldDescription: "This is your room descirption",
    },
    {
        fieldName: "tags",
        label: "Tags",
        fieldDescription: "This is the technologies used in your project",
        placeholder:"typescript, react"
    },
    {
        fieldName: "githubRepo",
        label: "github repo",
        fieldDescription: "This is your public Github repo url",
        placeholder:"https:/github.com/user/repo"
    } 
]