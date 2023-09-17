import { css } from "@emotion/react";
import { motion } from "framer-motion";
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
          position: relative;
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

          :hover {
            border-radius: 12px;
            background: var(--green-color);
            svg path {
              fill: #fff;
            }
          }
        `}
      >
        {active && (
          <motion.div
            initial={{ translateX: -26 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            css={css`
              position: absolute;
              width: 20px;
              height: 100%;
              background: white;
              border-radius: 0 12px 12px 0;
              left: -26px;
            `}
          />
        )}
        {children}
      </div>
    </div>
  );
};
