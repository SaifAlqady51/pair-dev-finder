import { Skeleton } from "@/components/ui/skeleton";

export const RoomCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-between border rounded-lg dark:shadow-dark shadow-lg">
      {/* Image placeholder */}
      <Skeleton className="w-full h-[180px] rounded-t-md" />

      <div>
        <div className="p-6 space-y-3">
          {/* Title placeholder */}
          <Skeleton className="h-6 w-3/4" />
          {/* Description placeholder */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Tags placeholder */}
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          {/* GitHub repo placeholder */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <div className="p-6 flex justify-between">
        {/* Button placeholder */}
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
};
