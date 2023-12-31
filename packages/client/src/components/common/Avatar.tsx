import { css } from "@emotion/react";
import { FC } from "react";
import LogoIcon from "@src/assets/svg/logo.svg";

interface Props {
  profileUrl?: string;
  size?: number;
  bgColor?: string;
  status?: "online" | "offline";
  showStroke?: boolean;
}

export const Avatar: FC<Props> = ({
  profileUrl,
  size = 32,
  bgColor,
  status = "offline",
  showStroke = false,
}) => {
  return (
    <div
      css={css`
        position: relative;
        min-width: ${size}px;
        min-height: ${size}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${bgColor ?? "var(--gray-300)"};
        display: flex;
        align-items: center;
        justify-content: center;
        ${showStroke &&
        css`
          outline: 2px solid var(--green-color);
        `}
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
      {status === "online" && (
        <div
          css={css`
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--green);
            bottom: -3px;
            right: -3px;
            border: 3px solid var(--background-100);
            background: rgb(35, 165, 90);
          `}
        />
      )}
    </div>
  );
};
