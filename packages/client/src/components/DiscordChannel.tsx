import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";
import { Channel } from "@src/types";

interface Props {
  channel: Channel;
  active: boolean;
}

export const DiscordChannel: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  channel,
  active,
  ...rest
}) => {
  return (
    <div {...rest}>
      <div
        className="icon"
        css={css`
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--background-200);
          border-radius: 50%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 8px;
          transition: all 250ms;
          cursor: pointer;
          ${active &&
          css`
            border-radius: 12px;
            background: var(--green-color);
          `}

          :hover {
            border-radius: 12px;
            background: var(--green-color);
          }
        `}
      >
        <h2>{channel.name.slice(0, 1)}</h2>
      </div>
    </div>
  );
};
