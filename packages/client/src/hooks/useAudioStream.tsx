import { useEffect, useRef } from "react";

export const useAudioStream = (audioDeviceId?: string) => {
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!audioDeviceId) return;
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: audioDeviceId,
        },
        video: false,
      })
      .then((stream) => {
        streamRef.current = stream;
      });
  }, [audioDeviceId]);

  return streamRef;
};
