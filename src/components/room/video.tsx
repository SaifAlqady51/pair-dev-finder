"use client";
import { useRef, useState } from "react";
import Pusher, { PresenceChannel } from "pusher-js";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useRouter } from "next/navigation";
import { useWebRtc } from "@/hooks/useWebRTC";
import { MediaButtons } from "./media-buttons";

interface VideoProps {
  roomId: string;
  userId: string;
  username: string;
}

export const Video: React.FC<VideoProps> = ({ roomId, username, userId }) => {
  const router = useRouter();
  const host = useRef(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const [isMicActive, setIsMicActive] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const { toggleMic, toggleCamera, handleRoomJoined } = useMediaStream({
    isMicActive,
    isCameraActive,
    userStream,
    setIsMicActive,
    setIsCameraActive,
    userVideo,
    host,
    channelRef,
  });

  const { leaveRoom } = useWebRtc({
    userStream,
    host,
    channelRef,
    partnerVideo,
    userVideo,
    router,
    pusherRef,
    userId,
    username,
    handleRoomJoined,
    roomId,
  });

  return (
    <div className=" relative w-full h-[calc(100vh-110px)] md:p-8 p-2 md:mx-12 bg-secondary m-4 rounded-[20px] ">
      <div className="relative h-full">
        <video
          className="drop-shadow-lg bg-slate-300 dark:bg-slate-600 w-full h-full md:aspect-video aspect-[9/16] object-cover rounded-[20px] "
          autoPlay
          ref={userVideo}
        />
        <MediaButtons
          isCameraActive={isCameraActive}
          isMicActive={isMicActive}
          toggleMic={toggleMic}
          toggleCamera={toggleCamera}
          leaveRoom={leaveRoom}
        />
      </div>
      <video
        className="absolute md:top-12 md:right-12 top-4 left-4 md:left-auto md:w-[400px] max-w-full w-1/2 dark:bg-slate-800 bg-slate-400 col-span-2 rounded-[20px] drop-shadow-lg object-cover md:aspect-video aspect-[9/14]"
        autoPlay
        muted
        ref={partnerVideo}
      />
    </div>
  );
};
