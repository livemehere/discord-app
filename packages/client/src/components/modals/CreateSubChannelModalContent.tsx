import { css } from "@emotion/react";
import { FC, useState } from "react";
import { ModalHeader } from "@src/components/modals/ModalHeader.tsx";
import { ModalInput } from "@src/components/modals/ModalInput.tsx";
import { ModalButton } from "@src/components/modals/ModalButton.tsx";
import { createSubChannel } from "@src/api";
import { userStore } from "@src/store/userStore.ts";
import { useQueryClient } from "@tanstack/react-query";
import { CHANNELS_KEY } from "@src/hooks/reactQueries/useChannels.ts";
import { ModalRadio } from "@src/components/modals/ModalRadio.tsx";
import SharpIcon from "@public/svg/sharp.svg";
import SpeakerIcon from "@public/svg/speaker.svg";
import { ModalSmallTitle } from "@src/components/modals/ModalSmallTitle.tsx";
import { SubChannel } from "@src/types";
import { useNavigate } from "react-router-dom";

interface Props {
  close: () => void;
  channelId: string;
}

export const CreateSubChannelModalContent: FC<Props> = ({
  close,
  channelId,
}) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<SubChannel["type"]>("TEXT");
  const disabled = channelName.length < 2;

  const queryClient = useQueryClient();
  const { user } = userStore();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const currentChannelId = channelId;
    if (!user || !currentChannelId) return;
    const newSubChannel = await createSubChannel(currentChannelId, {
      name: channelName,
      description,
      type,
    }).then((res) => res.data);
    await queryClient.invalidateQueries({ queryKey: [CHANNELS_KEY] });
    navigate(`/${currentChannelId}/${newSubChannel.id}`);
    close();
  };

  return (
    <div
      css={css`
        color: var(--border-black);
        width: 469px;
        max-width: 80vw;
        background: rgb(49, 51, 56);
        border-radius: 8px;
      `}
    >
      <ModalHeader
        close={close}
        title={"채널 만들기"}
        desc={":채팅 채널에 속해 있음"}
      />
      <div
        css={css`
          padding: 12px;
        `}
      >
        <ModalSmallTitle>채널 유형</ModalSmallTitle>
        <div>
          <ModalRadio
            value={type}
            onChange={(v) => setType(v)}
            list={[
              {
                value: "TEXT",
                desc: "메시지, 이미지, GIF, 이모지, 의견, 농담을 전송하세요",
                label: "Text",
                icon: <SharpIcon width={20} height={20} />,
              },
              {
                value: "AUDIO_TEXT",
                desc: "음성, 영상, 화면 공유로 함께 어울리세요",
                label: "Voice",
                icon: <SpeakerIcon width={20} height={20} />,
              },
            ]}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 20px;
          `}
        >
          <ModalSmallTitle>채널 이름</ModalSmallTitle>
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
          disabled={disabled}
          css={css`
            display: block;
            margin-top: 14px;
            margin-left: auto;
          `}
        >
          채널 만들기
        </ModalButton>
      </div>
    </div>
  );
};
