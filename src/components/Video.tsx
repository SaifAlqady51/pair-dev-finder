"use client";
import { useRef, useEffect, useState } from "react";
import Pusher, { Members, PresenceChannel } from "pusher-js";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useRouter } from "next/navigation";
import { useWebRtc } from "@/hooks/useWebRTC";
import { MediaButtons } from "./MediaButtons";

interface VideoProps {
  roomId: string;
  userId: string;
  username: string;
}

export const Video: React.FC<VideoProps> = ({ roomId, username, userId }) => {
  // Setup states
  const router = useRouter();
  const host = useRef(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const [isMicActive, setIsMicActive] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(true);
  // invoke useMediaStram customed hook
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

  // invoke useWebRTC customed hook
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
  });
  // Set up pusher

  return (
    <div className=" relative w-full h-fit md:p-8 p-2 md:ml-12 bg-secondary m-4 rounded-[20px] ">
      <div className="relative h-2/3">
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
        className="absolute md:bottom-12 md:top-auto md:right-12 top-4 right-4 md:w-1/4 w-2/3 h-60 dark:bg-slate-800 bg-slate-400 col-span-2 rounded-[20px] drop-shadow-lg object-cover"
        autoPlay
        muted
        ref={partnerVideo}
      />
    </div>
  );
};
