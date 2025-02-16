import { Badge } from "./ui/badge";

export const TagList: React.FC<{ keywords: string[] | undefined }> = ({
  keywords,
}) => {
  if (keywords) {
    return (
      <div className="flex gap-2 flex-wrap">
        {keywords?.map((lang: string) => (
          <Badge key={lang} className="text-base px-6">
            {lang}
          </Badge>
        ))}
      </div>
    );
  }
};
