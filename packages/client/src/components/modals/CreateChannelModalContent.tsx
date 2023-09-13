import { css } from "@emotion/react";
import { FC } from "react";
import { ModalHeader } from "@src/components/modals/ModalHeader.tsx";

interface Props {
  close: () => void;
}

export const CreateChannelModalContent: FC<Props> = ({ close }) => {
  return (
    <div
      css={css`
        color: var(--border-black);
        width: 400px;
        max-width: 80vw;
      `}
    >
      <ModalHeader
        close={close}
        title={"채널 만들기"}
        desc={
          "서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해보세요."
        }
      />
    </div>
  );
};
