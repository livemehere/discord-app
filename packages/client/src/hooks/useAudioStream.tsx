import { useEffect, useState } from "react";

export const useAudioStream = (audioDeviceId?: string) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
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
        setStream(stream);
      });
  }, [audioDeviceId]);

  return stream;
};
