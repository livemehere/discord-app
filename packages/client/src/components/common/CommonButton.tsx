import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const CommonButton: FC<Props> = ({
  children,
  active,
  disabled,
  ...props
}) => {
  return (
    <button
      css={css`
        padding: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        color: var(--text-muted);
        font-weight: 500;
        border-radius: 6px;
        :hover:not(:disabled) {
          color: var(--text-normal);
          background: rgba(255, 255, 255, 0.04);
        }

        ${active &&
        css`
          color: var(--text-active);
          background: rgba(255, 255, 255, 0.04);
        `}

        ${disabled &&
        css`
          opacity: 0.5;
          cursor: default;
        `}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
