import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC } from "react";

export const ModalButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      css={css`
        background: rgb(82, 94, 226);
        color: #fff;
        border-radius: 3px;
        padding: 2px 16px;
        height: 38px;
        font-size: 14px;
        ${props.disabled &&
        css`
          opacity: 0.8;
          color: var(--text-muted);
          cursor: default;
        `}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
