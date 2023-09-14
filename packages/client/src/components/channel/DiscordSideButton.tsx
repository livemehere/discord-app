import { css } from "@emotion/react";
import { FC, HTMLAttributes, ReactNode } from "react";

interface Props {
  active?: boolean;
  children: ReactNode;
}

export const DiscordSideButton: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  children,
  active = false,
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
          margin-bottom: 12px;
          transition: all 250ms;
          cursor: pointer;
          svg path {
            fill: var(--green-color);
          }
          ${active &&
          css`
            border-radius: 12px;
            background: var(--green-color);
            svg path {
              fill: #fff;
            }
          `}

          :hover {
            border-radius: 12px;
            background: var(--green-color);
            svg path {
              fill: #fff;
            }
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};
