import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoOffFill,
  BsCameraVideoFill,
} from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { SidebarTrigger } from "./ui/sidebar";
import { HiDotsHorizontal } from "react-icons/hi";

type MediaButtonsProps = {
  toggleMic: () => void;
  isMicActive: boolean;
  leaveRoom: () => void;
  toggleCamera: () => void;
  isCameraActive: boolean;
};

const buttonStyles: string =
  "bg-slate-900 hover:bg-slate-800  dark-slate-400 rounded-md p-2 opacity-70";
const buttonIconStyles: string = "text-white w-7 h-7";

export function MediaButtons({
  toggleMic,
  isMicActive,
  leaveRoom,
  toggleCamera,
  isCameraActive,
}: MediaButtonsProps) {
  return (
    <div className="absolute bottom-2 left-0 w-full flex justify-between">
      <div className="space-x-4">
        <MediaButton onClick={leaveRoom} type="button">
          <GoSignOut className={buttonIconStyles} />
        </MediaButton>
        <MediaButton onClick={toggleMic} type="button">
          {isMicActive ? (
            <BsMicFill className={buttonIconStyles} />
          ) : (
            <BsMicMuteFill className={buttonIconStyles} />
          )}
        </MediaButton>

        <MediaButton
          onClick={toggleCamera}
          type="button"
          className={buttonStyles}
        >
          {isCameraActive ? (
            <BsCameraVideoFill className={buttonIconStyles} />
          ) : (
            <BsCameraVideoOffFill className={buttonIconStyles} />
          )}
        </MediaButton>
      </div>
      <div>
        <SidebarTrigger>
          <MediaButton>
            <HiDotsHorizontal className={buttonIconStyles} />
          </MediaButton>
        </SidebarTrigger>
      </div>
    </div>
  );
}

type MediaButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const MediaButton = ({ onClick, children, ...props }: MediaButtonProps) => (
  <button
    onClick={onClick}
    type="button"
    className="bg-slate-900 hover:bg-slate-800 dark-slate-400 rounded-md p-2 opacity-70"
    {...props}
  >
    {children}
  </button>
);
