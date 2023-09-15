import { css } from "@emotion/react";
import { FC, useEffect, useRef } from "react";
import { settingStore } from "@src/store/settingStore.ts";
import { useAudioStream } from "@src/hooks/useAudioStream.tsx";
import { SubChannel } from "@src/types";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { userStore } from "@src/store/userStore.ts";

interface Props {
  subChannel: SubChannel;
}

export const DiscordAudioStreamer: FC<Props> = ({ subChannel }) => {
  const {
    audioDeviceId,
    setAudioDeviceId,
    audioDeviceList,
    setAudioDeviceList,
  } = settingStore();
  const { emit } = useSocket();

  const streamRef = useAudioStream(audioDeviceId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user } = userStore();

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream || !user) return;

    let chunks: Blob[] = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstart = function () {
      chunks = [];
    };

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = function () {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      emit("audio", { subChannelId: subChannel.id, userId: user.id, blob });
    };

    const startTimer = setInterval(function () {
      console.log("start");
      mediaRecorder.start();

      setTimeout(() => {
        console.log("stop");
        mediaRecorder.stop();
      }, 490);
    }, 500);

    return () => {
      clearInterval(startTimer);
    };

    // emit("audio", { subChannelId: subChannel.id, stream: streamRef.current });
  }, [emit, audioDeviceId, user]);

  useSocketEvent("audio", (data) => {
    console.log("receive", data);
    const blob = new Blob([data.blob], { type: "audio/ogg; codecs=opus" });
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = URL.createObjectURL(blob);
    audio.play();
  });

  return (
    <div
      css={css`
        padding-left: 34px;
      `}
    >
      <audio ref={audioRef}></audio>
      DiscordAudioStreamer
    </div>
  );
};
