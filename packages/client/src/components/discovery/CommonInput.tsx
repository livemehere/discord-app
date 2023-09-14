import { css } from "@emotion/react";
import { FC, InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  bgColor?: string;
  color?: string;
  icon?: ReactNode;
  iconColor?: string;
  onClickIcon?: () => void;
}

export const CommonInput: FC<Props> = ({
  bgColor = "#fff",
  color = "rgb(49, 51, 56)",
  icon,
  iconColor,
  onClickIcon,
  ...props
}) => {
  return (
    <div
      css={css`
        background-color: ${bgColor};
        display: flex;
        padding: 4px 8px;
        border-radius: 2px;
        svg {
          path {
            fill: ${iconColor ? iconColor : color};
          }
        }
      `}
    >
      <input
        type="text"
        css={css`
          width: 100%;
          height: 100%;
          background: transparent;
          color: ${color};
        `}
        {...props}
      />
      <button
        css={css`
          display: flex;
          background: transparent;
          border: none;
          cursor: pointer;
          justify-content: center;
          align-items: center;
        `}
        onClick={onClickIcon}
      >
        {icon}
      </button>
    </div>
  );
};
