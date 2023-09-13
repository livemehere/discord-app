import { css } from "@emotion/react";
import { forwardRef, InputHTMLAttributes } from "react";

export const ModalInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div
      css={css`
        background-color: rgba(0, 0, 0, 0.08);
      `}
    >
      <input
        type="text"
        ref={ref}
        css={css`
          box-sizing: border-box;
          background-color: transparent;
          width: 100%;
          padding: 10px;
          color: rgb(49, 51, 56);
          border-radius: 3px;
        `}
        {...props}
      />
    </div>
  );
});
