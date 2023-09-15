import { css } from "@emotion/react";
import { FC } from "react";
import { ModalHeader } from "@src/components/modals/ModalHeader.tsx";
import { ModalButton } from "@src/components/modals/ModalButton.tsx";

interface Props {
  close: () => void;
}

export const WelcomeToChannelModal: FC<Props> = ({ close }) => {
  return (
    <div
      css={css`
        color: var(--border-black);
        width: 400px;
        max-width: 80vw;
        background: rgb(49, 51, 56);
        border-radius: 8px;
      `}
    >
      <ModalHeader
        close={close}
        title={"환영합니다!"}
        desc={
          "채널에 자동가입되었어요. 채널 멤버들과 함께 즐거운 시간 보내세요!"
        }
      />
      <div
        css={css`
          font-size: 4rem;
          text-align: center;
          padding: 20px 0;
        `}
      >
        🎉
      </div>
      <div
        css={css`
          padding: 0 20px 20px;
        `}
      >
        <ModalButton
          onClick={close}
          css={css`
            width: 90%;
            margin: auto;
          `}
        >
          채팅 시작하기
        </ModalButton>
      </div>
    </div>
  );
};
