import { css } from "@emotion/react";
import { FC } from "react";
import MicIcon from "@public/svg/mic.svg";
import MicDisableIcon from "@public/svg/mic-disable.svg";
import HeadsetIcon from "@public/svg/headset.svg";
import HeadsetDisableIcon from "@public/svg/headset-disable.svg";
import SettingIcon from "@public/svg/setting.svg";
import { settingStore } from "@src/store/settingStore.ts";

interface Props {}

export const GlobalSettingButtons: FC<Props> = ({}) => {
  const { setMic, setSound, mic, sound } = settingStore();

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
      <button>
        <SettingIcon />
      </button>
    </div>
  );
};
