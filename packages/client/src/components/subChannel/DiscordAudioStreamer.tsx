import { css } from "@emotion/react";
import { FC, useEffect, useRef, useState } from "react";
import { settingStore } from "@src/store/settingStore.ts";
import { useAudioStream } from "@src/hooks/useAudioStream.tsx";
import { SubChannel } from "@src/types";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { userStore } from "@src/store/userStore.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { User } from "../onlineMembers/User";

interface Props {
  subChannel: SubChannel;
  streamOn?: boolean;
}

export const DiscordAudioStreamer: FC<Props> = ({
  subChannel,
  streamOn = false,
}) => {
  const { audioDeviceId, mic, sound, openSettingWith } = settingStore();
  const { emit } = useSocket();
  const { onlineMembers } = channelStore();
  const joinedMembers = onlineMembers.filter((m) =>
    m.rooms.includes(subChannel.id),
  );

  const [speakers, setSpeakers] = useState<string[]>([]);

  const stream = useAudioStream(audioDeviceId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user } = userStore();

  useEffect(() => {
    if (!audioDeviceId && mic) {
      openSettingWith("audio");
    }
  }, [audioDeviceId, mic]);

  useEffect(() => {
    if (!stream || !user || !mic || !streamOn) return;

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

    let stopTimer: number | undefined = undefined;
    const startTimer = window.setInterval(function () {
      console.log("record start");
      mediaRecorder.start();

      stopTimer = window.setTimeout(() => {
        console.log("record stop");
        mediaRecorder.stop();
      }, 490);
    }, 500);

    return () => {
      clearInterval(startTimer);
      clearTimeout(stopTimer);
    };
  }, [emit, audioDeviceId, user, stream, mic, streamOn]);

  useSocketEvent(
    "audio",
    (data: { subChannelId: string; userId: string; blob: Blob }) => {
      if (!sound) return;
      const blob = new Blob([data.blob], { type: "audio/ogg; codecs=opus" });
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = URL.createObjectURL(blob);
      audio.play();

      // 화자 표시
      setSpeakers((prev) => {
        if (prev.includes(data.userId)) return prev;
        return [...prev, data.userId];
      });

      setTimeout(() => {
        setSpeakers((prev) => prev.filter((p) => p !== data.userId));
      }, 1000);
    },
  );

  return (
    <div
      css={css`
        padding-left: 12px;
      `}
    >
      <audio ref={audioRef}></audio>
      <div
        css={css`
          margin-top: 4px;
        `}
      >
        {joinedMembers.map((member) => (
          <User
            key={member.userId}
            userId={member.userId}
            showStroke={speakers.includes(member.userId)}
            avatarSize={24}
            css={css`
              padding: 3px 0;
            `}
          />
        ))}
      </div>
    </div>
  );
};
