import { HiDotsHorizontal } from "react-icons/hi";
import { Indicator } from "../ui/indicator";
import { SidebarTrigger } from "../ui/sidebar";

interface ToggleSidebarButtonProps {
  unreadMessagesCount: number;
}

export const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({
  unreadMessagesCount,
}) => {
  return (
    <Indicator
      count={unreadMessagesCount}
      position="top-right"
      badgeClassName="h-6 w-6 text-xs font-medium bg-blue-500"
    >
      <SidebarTrigger className="flex w-11 h-11 bg-slate-900 hover:bg-slate-800 dark-slate-400 rounded-md p-2 opacity-70">
        <HiDotsHorizontal className="text-white w-7 h-7" />
      </SidebarTrigger>
    </Indicator>
  );
};
