import { css } from "@emotion/react";
import { FC, HTMLAttributes } from "react";

export const ModalButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
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
      `}
      {...props}
    >
      {children}
    </button>
  );
};
