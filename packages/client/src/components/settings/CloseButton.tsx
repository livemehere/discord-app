import { css } from "@emotion/react";
import { FC } from "react";
import CloseIcon from "@public/svg/close.svg";

interface Props {
  onClick: () => void;
}

export const CloseButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      css={css`
        position: relative;
        border: 1px solid rgb(181, 186, 193);
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgb(255, 255, 255);
          p {
            color: rgb(255, 255, 255);
          }
        }

        p {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: rgb(181, 186, 193);
          font-weight: 700;
        }
      `}
    >
      <CloseIcon />
      <p>ESC</p>
    </button>
  );
};
