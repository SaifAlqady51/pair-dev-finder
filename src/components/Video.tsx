"use client";
import { useRef, useEffect, useState } from "react";
import Pusher, { Members, PresenceChannel } from "pusher-js";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useRouter } from "next/navigation";
import { useWebRtc } from "@/hooks/useWebRTC";
import { MediaButtons } from "./MediaButtons";

export function Video({ roomId }: { roomId: string }) {
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
  const {
    initiateCall,
    handleReceivedOffer,
    handleAnswerReceived,
    handlerNewIceCandidateMsg,
    handlePeerLeaving,
    leaveRoom,
  } = useWebRtc({
    userStream,
    host,
    channelRef,
    partnerVideo,
    userVideo,
    router,
  });
  // Set up pusher
  useEffect(() => {
    // Create pusher instance
    pusherRef.current = new Pusher(process.env.PUSHER_KEY!, {
      authEndpoint: "/api/pusher/auth",
      auth: {
        params: { username: "saif" },
      },
      cluster: "eu",
    });

    channelRef.current = pusherRef.current.subscribe(
      `presence-room`
    ) as PresenceChannel;
    // Join room
    channelRef.current.bind(
      "pusher:subscription_succeeded",
      (members: Members) => {
        if (members.count === 1) {
          host.current = true;
        }
        if (members.count > 2) {
          router.push("/");
        }
        handleRoomJoined();
      }
    );
    // start call with the partner
    channelRef.current.bind("client-ready", () => {
      initiateCall();
    });
    // offer call request
    channelRef.current.bind(
      "client-offer",

      (offer: RTCSessionDescriptionInit) => {
        if (!host.current) {
          handleReceivedOffer(offer);
        }
      }
    );
    // leave room
    channelRef.current.bind("pusher:member_removed", handlePeerLeaving);
    channelRef.current.bind(
      "client-answer",

      (answer: RTCSessionDescriptionInit) => {
        if (host.current) {
          handleAnswerReceived(answer as RTCSessionDescriptionInit);
        }
      }
    );
    // Send ice-candidate message to partner
    channelRef.current.bind(
      "client-ice-candidate",
      (iceCandidate: RTCIceCandidate) => {
        handlerNewIceCandidateMsg(iceCandidate);
      }
    );
    // Cleanup function to unbind all events and disconnect from Pusher when component unmounts
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        channelRef.current.unsubscribe();
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className=" w-full h-fit p-8 ml-12  dark:bg-slate-800 bg-slate-200 m-4 rounded-[20px] space-y-10">
      <div className="relative">
        <video
          className="drop-shadow-lg bg-slate-300 dark:bg-slate-600 w-full rounded-[20px] "
          autoPlay
          muted
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
      <div>
        <video
          className="w-1/3 h-60 bg-slate-300 dark:bg-slate-600 col-span-2 rounded-[20px] drop-shadow-lg"
          autoPlay
          ref={partnerVideo}
        />
      </div>
    </div>
  );
}
