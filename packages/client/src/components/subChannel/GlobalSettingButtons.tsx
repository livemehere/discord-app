import { css } from "@emotion/react";
import { FC } from "react";
import MicIcon from "@src/assets/svg/mic.svg";
import MicDisableIcon from "@src/assets/svg/mic-disable.svg";
import HeadsetIcon from "@src/assets/svg/headset.svg";
import HeadsetDisableIcon from "@src/assets/svg/headset-disable.svg";
import SettingIcon from "@src/assets/svg/setting.svg";
import { settingStore } from "@src/store/settingStore.ts";

interface Props {}

export const GlobalSettingButtons: FC<Props> = ({}) => {
  const { setMic, setSound, mic, sound, openSettingWith } = settingStore();

  return (
    <div
      css={css`
        display: flex;
        align-items: center;

        svg {
          path {
            fill: var(--gray-200);
          }
          .strikethrough-2Kl6HF {
            fill: var(--warn-color);
          }
        }
        button {
          width: 32px;
          border-radius: 4px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          :hover {
            background: var(--gray-hover);
          }
        }
      `}
    >
      <button onClick={() => setMic(!mic)}>
        {mic ? <MicIcon /> : <MicDisableIcon />}
      </button>
      <button onClick={() => setSound(!sound)}>
        {sound ? <HeadsetIcon /> : <HeadsetDisableIcon />}
      </button>

      <button onClick={() => openSettingWith("audio")}>
        <SettingIcon />
      </button>
    </div>
  );
};
