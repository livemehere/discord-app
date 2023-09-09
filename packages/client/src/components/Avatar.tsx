import { css } from "@emotion/react";
import { FC } from "react";
import LogoIcon from "@src/assets/svg/logo.svg";

interface Props {
  profileUrl?: string;
  size?: number;
  bgColor?: string;
}

export const Avatar: FC<Props> = ({ profileUrl, size = 32, bgColor }) => {
  return (
    <div
      css={css`
        min-width: ${size}px;
        min-height: ${size}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${bgColor ?? "var(--gray-300)"};
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          path {
            fill: #fff;
          }
        }

        svg,
        img {
          width: ${size - 8}px;
        }
      `}
    >
      {profileUrl ? <img src={profileUrl} alt="avatar" /> : <LogoIcon />}
    </div>
  );
};
