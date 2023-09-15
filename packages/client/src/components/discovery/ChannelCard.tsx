import { css } from "@emotion/react";
import { FC } from "react";
import { Channel } from "@src/types";
import LogoIcon from "@src/assets/svg/logo.svg?url";

interface Props {
  channel: Channel;
}

export const ChannelCard: FC<Props> = ({ channel }) => {
  return (
    <div
      css={css`
        height: 320px;
        background-color: rgb(35, 36, 40);
        border-radius: 8px;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 143px;
          margin-bottom: 32px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      >
        <img src={"/bg/channel-cover-default.svg"} alt="" />
        <div
          className="avatar"
          css={css`
            position: absolute;
            bottom: -21px;
            left: 12px;
            width: 48px;
            height: 48px;
            background: rgb(35, 36, 40);
            border-radius: 8px;
          `}
        >
          <img src={LogoIcon} alt="" />
        </div>
      </div>
      <div
        css={css`
          padding: 0 16px 16px;
        `}
      >
        <h3
          css={css`
            font-size: 16px;
          `}
        >
          {channel.name}
        </h3>
        <p
          css={css`
            margin: 4px 0 16px;
            color: rgb(181, 186, 193);
            font-size: 14px;
          `}
        >
          {channel.description}
        </p>
      </div>
    </div>
  );
};
