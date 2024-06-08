"use client";
import { useRef, useEffect, useState } from "react";
import Pusher, { Members, PresenceChannel } from "pusher-js";
import { useMediaStream } from "@/hooks/useMediaStream";
import { useRouter } from "next/navigation";
import { useWebRtc } from "@/hooks/useWebRTC";

export function Video({ roomId }: { roomId: string }) {
  // Setup states
  const router = useRouter();
  const host = useRef(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<PresenceChannel | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  // invoke useMediaStram customed hook
  const { toggleMic, toggleCamera, handleRoomJoined } = useMediaStream({
    micActive,
    cameraActive,
    userStream,
    setMicActive,
    setCameraActive,
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
  }, []);

  return (
    <div className="col-span-3 p-8 grid-cols-3  grid-rows-4 dark:bg-slate-800 bg-gray-100 m-4 rounded-[20px] space-y-10">
      <video
        className="drop-shadow-lg bg-gray-100 w-full row-span-3 rounded-[20px] "
        autoPlay
        muted
        ref={userVideo}
      />
      <video
        className="w-1/3 h-52 bg-gray-100 row-span-1 col-span-2 rounded-[20px]"
        autoPlay
        ref={partnerVideo}
      />
    </div>
  );
}
