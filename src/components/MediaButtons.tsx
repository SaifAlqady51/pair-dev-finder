import { ReactNode } from "react";
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoOffFill,
  BsCameraVideoFill,
} from "react-icons/bs";
import { GoSignIn, GoSignOut } from "react-icons/go";

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
    <div className=" flex gap-4 absolute bottom-2 left-3">
      <button onClick={leaveRoom} type="button" className={buttonStyles}>
        <GoSignOut className={buttonIconStyles} />
      </button>
      <button onClick={toggleMic} type="button" className={buttonStyles}>
        {isMicActive ? (
          <BsMicFill className={buttonIconStyles} />
        ) : (
          <BsMicMuteFill className={buttonIconStyles} />
        )}
      </button>

      <button onClick={toggleCamera} type="button" className={buttonStyles}>
        {isCameraActive ? (
          <BsCameraVideoFill className={buttonIconStyles} />
        ) : (
          <BsCameraVideoOffFill className={buttonIconStyles} />
        )}
      </button>
    </div>
  );
}
