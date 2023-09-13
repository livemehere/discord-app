import { css } from "@emotion/react";
import { forwardRef, InputHTMLAttributes } from "react";

export const ModalInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div
      css={css`
        background-color: rgb(30, 31, 34);
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
          color: rgb(219, 222, 225);
          border-radius: 3px;
        `}
        {...props}
      />
    </div>
  );
});
