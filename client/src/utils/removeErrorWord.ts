export function removeErrorWord(input: string): string {
    // Use a regular expression to find and remove the word "Error"
    
    
    const result = input.toString().replace(/Error:?/g , "");
    // Trim any extra whitespace that may result from the removal
    return result.trim();
}