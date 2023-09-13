import { FC, useState } from "react";
import { DiscordSubChannel } from "@src/components/subChannel/DiscordSubChannel.tsx";
import { css } from "@emotion/react";
import { CategoryList } from "@src/components/subChannel/CategoryList.tsx";
import { CategoryButton } from "@src/components/subChannel/CategoryButton.tsx";
import SharpIcon from "@src/assets/svg/sharp.svg";
import SpeakerIcon from "@src/assets/svg/speaker.svg";
import AddIcon from "@src/assets/svg/add.svg";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { CreateSubChannelModalContent } from "@src/components/modals/CreateSubChannelModalContent.tsx";
import { SubChannel } from "@src/types";

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

  const { pushModal, closeModal } = useModal();

  const handleAddSubChannel = () => {
    const key = pushModal(
      <CreateSubChannelModalContent close={() => closeModal(key)} />,
    );
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
            value={subChannel}
            highLight={false}
            active={value?.id === subChannel.id}
            onClick={() => onChange(subChannel)}
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
          <DiscordSubChannel
            key={subChannel.id}
            value={subChannel}
            highLight={false}
            active={value?.id === subChannel.id}
            onClick={() => onChange(subChannel)}
            icon={<SpeakerIcon width={20} height={20} />}
          />
        ))}
      </CategoryList>
    </ul>
  );
};
