import { css } from "@emotion/react";
import { FC } from "react";
import CloseIcon from "@src/assets/svg/close.svg";

interface Props {
  close: () => void;
  title: string;
  desc: string;
}

export const ModalHeader: FC<Props> = ({ close, title, desc }) => {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        className="header"
        css={css`
          position: absolute;
          top: -24px;
          right: 0;
          display: flex;
          justify-content: end;
          padding: 12px 8px 0 12px;
        `}
      >
        <button onClick={close}>
          <CloseIcon />
        </button>
      </div>
      <h2
        css={css`
          text-align: center;
          margin-bottom: 6px;
          margin-top: 24px;
        `}
      >
        {title}
      </h2>
      <p
        css={css`
          color: var(--gray-300);
          padding: 6px 12px;
        `}
      >
        {desc}
      </p>
    </div>
  );
};
