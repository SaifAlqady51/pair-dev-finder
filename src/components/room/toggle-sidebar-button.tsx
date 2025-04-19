import { HiDotsHorizontal } from "react-icons/hi";
import { Indicator } from "../ui/indicator";
import { SidebarTrigger } from "../ui/sidebar";
import { useUnreadMessagesCounter } from "../providers";

export const ToggleSidebarButton = () => {
  const { unreadMessagesCount } = useUnreadMessagesCounter();
  return (
    <Indicator
      count={unreadMessagesCount}
      position="top-right"
      badgeClassName="h-6 w-6 text-[10px] bg-blue-500"
    >
      <SidebarTrigger className="flex w-11 h-11 bg-slate-900 hover:bg-slate-800 dark-slate-400 rounded-md p-2 opacity-70">
        <HiDotsHorizontal className="text-white w-7 h-7" />
      </SidebarTrigger>
    </Indicator>
  );
};
