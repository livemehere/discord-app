import { css } from "@emotion/react";
import { FC } from "react";
import CloseIcon from "@public/svg/close.svg";

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
          right: 0;
          display: flex;
          justify-content: end;
          padding: 12px 8px 0 12px;
          svg path {
            fill: var(--text-muted);
          }
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
          padding-top: 24px;
          color: var(--text-normal);
        `}
      >
        {title}
      </h2>
      <p
        css={css`
          color: var(--text-muted);
          padding: 6px 12px;
          font-size: 12px;
          text-align: center;
        `}
      >
        {desc}
      </p>
    </div>
  );
};
