import { css } from "@emotion/react";
import { FC } from "react";
import { Channel } from "@src/types";
import DefaultChannelCover from "@public/bg/channel-cover-default.svg?url";
import LogoImage from "@public/logo.png?url";

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
        display: flex;
        flex-direction: column;
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
        <img src={DefaultChannelCover} alt="" />
        <div
          className="avatar"
          css={css`
            box-sizing: border-box;
            position: absolute;
            bottom: -21px;
            left: 12px;
            width: 48px;
            height: 48px;
            background: rgb(30, 31, 31);
            border-radius: 8px;
            overflow: hidden;
            padding: 4px;
            img {
              border-radius: 8px;
            }
          `}
        >
          <img src={LogoImage} alt="" />
        </div>
      </div>
      <div
        css={css`
          padding: 0 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
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
            flex: 1;
          `}
        >
          {channel.description}
        </p>
        <div className="footer">
          <div
            className="memberCount"
            css={css`
              display: flex;
              align-items: center;
              gap: 4px;
              color: rgb(196, 201, 206);
              font-size: 14px;
            `}
          >
            <div
              className="dot"
              css={css`
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgb(196, 201, 206);
              `}
            />
            <span>멤버 {channel.members.length}명</span>
          </div>
        </div>
      </div>
    </div>
  );
};
