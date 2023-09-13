import { css } from "@emotion/react";
import { FC, useState } from "react";
import { ModalHeader } from "@src/components/modals/ModalHeader.tsx";
import { ModalInput } from "@src/components/modals/ModalInput.tsx";
import { ModalButton } from "@src/components/modals/ModalButton.tsx";
import { createChannel } from "@src/api";
import { userStore } from "@src/store/userStore.ts";
import { useQueryClient } from "@tanstack/react-query";
import { CHANNELS_KEY } from "@src/hooks/reactQueries/useChannels.ts";

interface Props {
  close: () => void;
}

export const CreateChannelModalContent: FC<Props> = ({ close }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = userStore();
  const queryClient = useQueryClient();
  const handleCreate = async () => {
    if (!user) return;
    await createChannel({
      name: channelName,
      description,
      moderatorId: user.id,
    });
    await queryClient.invalidateQueries({ queryKey: [CHANNELS_KEY] });
    close();
  };
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
      <div
        css={css`
          padding: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <ModalInput
            value={channelName}
            placeholder={"채널명"}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <ModalInput
            value={description}
            placeholder={"채널 설명"}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <ModalButton
          onClick={handleCreate}
          css={css`
            display: block;
            margin-top: 14px;
            margin-left: auto;
          `}
        >
          채널 생성
        </ModalButton>
      </div>
    </div>
  );
};
