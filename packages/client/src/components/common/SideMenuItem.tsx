import { css } from "@emotion/react";
import { FC, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon: ReactNode;
  activeColor?: string;
  active?: boolean;
  dimmed?: boolean;
  hoverAction?: boolean;
}

export const SideMenuItem: FC<Props> = ({
  children,
  icon,
  active = false,
  activeColor = "var(--primary-color)",
  dimmed = false,
  hoverAction = true,
  ...props
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-left: 8px;
        margin-right: 6px;
        cursor: pointer;
        padding: 6px 4px;
        border-radius: 4px;

        ${dimmed &&
        css`
          opacity: 0.5;
        `}

        :hover {
          ${hoverAction &&
          css`
            opacity: 1;
            background-color: rgb(54, 57, 63);
            span {
              color: white;
            }
          `}
        }

        ${active &&
        css`
          background-color: ${activeColor};
          span {
            color: white;
          }
          svg path {
            fill: white;
          }
        `}
      `}
      {...props}
    >
      <div
        css={css`
          padding: 1px 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {icon}
      </div>
      <span
        css={css`
          color: rgb(148, 155, 164);
          font-weight: 500;
        `}
      >
        {children}
      </span>
    </div>
  );
};
