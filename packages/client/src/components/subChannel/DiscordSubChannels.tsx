import { FC, Fragment, useState } from "react";
import { DiscordSubChannel } from "@src/components/subChannel/DiscordSubChannel.tsx";
import { css } from "@emotion/react";
import { CategoryList } from "@src/components/subChannel/CategoryList.tsx";
import { CategoryButton } from "@src/components/subChannel/CategoryButton.tsx";
import SharpIcon from "@public/svg/sharp.svg";
import SpeakerIcon from "@public/svg/speaker.svg";
import AddIcon from "@public/svg/add.svg";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { CreateSubChannelModalContent } from "@src/components/modals/CreateSubChannelModalContent.tsx";
import { SubChannel } from "@src/types";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { useParams } from "react-router-dom";
import { DiscordAudioStreamer } from "@src/components/subChannel/DiscordAudioStreamer.tsx";

interface Props {
  list: SubChannel[];
  value?: SubChannel;
  onChange: (subChannel: SubChannel) => void;
}

export const DiscordSubChannels: FC<Props> = ({ list, onChange, value }) => {
  const textOnlyChannels = list.filter((l) => l.type === "TEXT");
  const audioTextChannels = list.filter((l) => l.type === "AUDIO_TEXT");
  const [showTextChannel, setShowTextChannel] = useState(true);
  const [showAudioTextChannel, setShowAudioTextChannel] = useState(true);
  const params = useParams();
  const currentChannelId = params.channelId;
  const currentSubChannelId = params.subChannelId;

  const { pushModal, closeModal } = useModal();

  const [newChatSubChannelIds, setNewChatSubChannelIds] = useState<string[]>(
    [],
  );

  const isHighLight = (subChannelId: string) => {
    if (
      newChatSubChannelIds.includes(subChannelId) &&
      subChannelId !== currentSubChannelId
    ) {
      return true;
    }
    return false;
  };

  useSocketEvent("new-chat", (subChannelId) => {
    const prev = newChatSubChannelIds;
    prev.push(subChannelId);
    setNewChatSubChannelIds(Array.from(new Set(prev)));
  });

  const handleAddSubChannel = () => {
    if (!currentChannelId) return;
    const key = pushModal(
      <CreateSubChannelModalContent
        close={() => closeModal(key)}
        channelId={currentChannelId}
      />,
    );
  };

  const handleChangeSubChannel = (subChannel: SubChannel) => {
    onChange(subChannel);
    const index = newChatSubChannelIds.indexOf(subChannel.id);
    if (index !== -1) {
      const prev = newChatSubChannelIds;
      prev.splice(index, 1);
      setNewChatSubChannelIds(prev);
    }
  };

  return (
    <ul
      css={css`
        padding: 0 8px;
      `}
    >
      <CategoryList
        toggleButton={
          <CategoryButton
            active={showTextChannel}
            onClick={() => setShowTextChannel((prev) => !prev)}
          >
            채팅 채널
          </CategoryButton>
        }
        right={
          <button onClick={handleAddSubChannel}>
            <AddIcon width={18} height={18} />
          </button>
        }
        showChildren={showTextChannel}
      >
        {textOnlyChannels.map((subChannel) => (
          <DiscordSubChannel
            key={subChannel.id}
            subChannel={subChannel}
            highLight={isHighLight(subChannel.id)}
            active={value?.id === subChannel.id}
            onClick={() => handleChangeSubChannel(subChannel)}
            icon={<SharpIcon width={20} height={20} />}
          />
        ))}
      </CategoryList>
      <CategoryList
        toggleButton={
          <CategoryButton
            active={showAudioTextChannel}
            onClick={() => setShowAudioTextChannel((prev) => !prev)}
          >
            음성 채널
          </CategoryButton>
        }
        right={
          <button onClick={handleAddSubChannel}>
            <AddIcon width={18} height={18} />
          </button>
        }
        showChildren={showAudioTextChannel}
      >
        {audioTextChannels.map((subChannel) => (
          <Fragment key={subChannel.id}>
            <DiscordSubChannel
              subChannel={subChannel}
              highLight={false}
              active={value?.id === subChannel.id}
              onClick={() => handleChangeSubChannel(subChannel)}
              icon={<SpeakerIcon width={20} height={20} />}
            />
            {subChannel.type === "AUDIO_TEXT" && (
              <DiscordAudioStreamer subChannel={subChannel} />
            )}
          </Fragment>
        ))}
      </CategoryList>
    </ul>
  );
};
