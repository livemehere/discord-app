import { css } from "@emotion/react";
import { FC, useEffect } from "react";
import { settingStore } from "@src/store/settingStore.ts";
import { useAudioStream } from "@src/hooks/useAudioStream.tsx";
import { useMediaDevices } from "@src/hooks/useMediaDevices.ts";

interface Props {}

export const AudioAndVideoSetting: FC<Props> = ({}) => {
  const {
    audioDeviceId,
    setAudioDeviceId,
    audioDeviceList,
    setAudioDeviceList,
  } = settingStore();

  const streamRef = useAudioStream(audioDeviceId);
  const deviceLIst = useMediaDevices();

  useEffect(() => {
    setAudioDeviceList(deviceLIst);
  }, [deviceLIst]);

  return (
    <div css={css``}>
      <h2>음성 설정</h2>
      <audio
        ref={(el) => {
          if (!el) return;
          el.srcObject = streamRef.current;
          el.play();
        }}
      />

      <div
        css={css`
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <h5>녹음 장치</h5>
        <select
          value={audioDeviceId}
          onChange={(v) => setAudioDeviceId(v.target.value)}
        >
          {audioDeviceList.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
