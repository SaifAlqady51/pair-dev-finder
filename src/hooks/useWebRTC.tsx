import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PresenceChannel } from "pusher-js";
import { MutableRefObject, RefObject, useCallback, useRef } from "react";

type WebRtcHookProps = {
  userStream: MutableRefObject<MediaStream | null>;
  host: MutableRefObject<boolean>;
  channelRef: MutableRefObject<PresenceChannel | null>;
  partnerVideo: RefObject<HTMLVideoElement>;
  userVideo: RefObject<HTMLVideoElement>;
  router: AppRouterInstance;
};

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:openrelay.metered.ca:80" },
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};
export function useWebRtc({
  userStream,
  host,
  channelRef,
  partnerVideo,
  userVideo,
  router,
}: WebRtcHookProps) {
  const rtcConnection = useRef<RTCPeerConnection | null>(null);
  const createPeerConnection = () => {
    const connection = new RTCPeerConnection(ICE_SERVERS);
    connection.onicecandidate = handleICECandidateEvent;
    connection.ontrack = handleTrackEvent;
    connection.onicecandidateerror = (e) => console.log(e);
    return connection;
  };
  const initiateCall = useCallback(async () => {
    if (!userStream.current) {
      try {
        userStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (userVideo.current) {
          userVideo.current.srcObject = userStream.current;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        return;
      }
    }
    if (host.current) {
      rtcConnection.current = createPeerConnection();
      userStream.current?.getTracks().forEach((track) => {
        rtcConnection.current?.addTrack(track, userStream.current!);
      });
      rtcConnection
        .current!.createOffer()
        .then((offer) => {
          rtcConnection.current!.setLocalDescription(offer);
          channelRef.current?.trigger("client-offer", offer);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [rtcConnection, userStream, channelRef]);

  const handleReceivedOffer = (offer: RTCSessionDescriptionInit) => {
    rtcConnection.current = createPeerConnection();
    userStream.current?.getTracks().forEach((track) => {
      rtcConnection.current?.addTrack(track, userStream.current!);
    });
    rtcConnection.current.setRemoteDescription(offer);
    rtcConnection.current
      .createAnswer()

      .then((answer) => {
        rtcConnection.current!.setLocalDescription(answer);

        channelRef.current?.trigger("client-answer", answer);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleAnswerReceived = (answer: RTCSessionDescriptionInit) => {
    rtcConnection
      .current!.setRemoteDescription(answer)
      .catch((error) => console.log(error));
  };

  const handleICECandidateEvent = async (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      channelRef.current?.trigger("client-ice-candidate", event.candidate);
    }
  };

  const handlerNewIceCandidateMsg = (incoming: RTCIceCandidate) => {
    const candidate = new RTCIceCandidate(incoming);
    rtcConnection
      .current!.addIceCandidate(candidate)
      .catch((error) => console.log(error));
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    partnerVideo.current!.srcObject = event.streams[0];
  };

  const handlePeerLeaving = () => {
    host.current = true;
    if (partnerVideo.current?.srcObject) {
      (partnerVideo.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving all track of Peer.
    }
    if (rtcConnection.current) {
      rtcConnection.current.ontrack = null;
      rtcConnection.current.onicecandidate = null;
      rtcConnection.current.close();
      rtcConnection.current = null;
    }
  };

  const leaveRoom = () => {
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => track.stop());
      userStream.current = null; // Ensure fresh stream when rejoining
    }

    if (partnerVideo.current?.srcObject) {
      (partnerVideo.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      partnerVideo.current.srcObject = null; // Reset video
    }

    if (rtcConnection.current) {
      rtcConnection.current.ontrack = null;
      rtcConnection.current.onicecandidate = null;
      rtcConnection.current.close();
      rtcConnection.current = null;
    }

    // Clear Pusher event listeners if applicable
    channelRef.current?.unbind("client-offer");
    channelRef.current?.unbind("client-answer");
    channelRef.current?.unbind("client-ice-candidate");

    router.push("/");
  };
  return {
    initiateCall,
    handleReceivedOffer,
    handleAnswerReceived,
    handlerNewIceCandidateMsg,
    handlePeerLeaving,
    leaveRoom,
  };
}
