export function splitTags(tags:string | undefined){
    if(!tags){
        return
    }

  return tags.split(",").map((lang: string) => lang.trim());
}