import { css } from "@emotion/react";
import { FC, useEffect } from "react";
import { settingStore } from "@src/store/settingStore.ts";
import { useAudioStream } from "@src/hooks/useAudioStream.tsx";
import { useMediaDevices } from "@src/hooks/useMediaDevices.ts";
import { DiscordTooltip } from "@src/components/utils/DiscordTooltip.tsx";

interface Props {}

export const AudioAndVideoSetting: FC<Props> = ({}) => {
  const {
    audioDeviceId,
    setAudioDeviceId,
    audioDeviceList,
    setAudioDeviceList,
  } = settingStore();

  const stream = useAudioStream(audioDeviceId);
  const deviceLIst = useMediaDevices();

  useEffect(() => {
    setAudioDeviceList(deviceLIst);
  }, [deviceLIst]);

  return (
    <div css={css``}>
      <h2>음성 설정</h2>
      <audio
        ref={(el) => {
          if (!el || !stream) return;
          el.srcObject = stream;
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
        <DiscordTooltip
          overlay={<span>녹음 장치를 선택하면서, 소리를 확인해보세요!</span>}
          placement="bottom"
        >
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
        </DiscordTooltip>
      </div>
    </div>
  );
};
