import { Badge } from "./ui/badge";

export const TagList: React.FC<{ tags: string[] | undefined }> = ({ tags }) => {
  if (tags) {
    return (
      <div className="flex gap-2 flex-wrap">
        {tags?.map((lang: string) => (
          <Badge key={lang} className="text-base px-6">
            {lang}
          </Badge>
        ))}
      </div>
    );
  }
};
