import { FC, useState } from "react";
import { DiscordSubChannel } from "@src/components/DiscordSubChannel.tsx";
import { css } from "@emotion/react";
import { SubChannel } from "@src/types";
import { CategoryList } from "@src/components/sideMenu/CategoryList.tsx";
import { CategoryButton } from "@src/components/sideMenu/CategoryButton.tsx";
import SharpIcon from "@src/assets/svg/sharp.svg";
import SpeakerIcon from "@src/assets/svg/speaker.svg";

interface Props {
  list: SubChannel[];
  value: SubChannel | null;
  onChange: (subChannel: SubChannel) => void;
}

export const DiscordSubChannels: FC<Props> = ({ list, onChange, value }) => {
  const textOnlyChannels = list.filter((l) => l.type === "TEXT");
  const audioTextChannels = list.filter((l) => l.type === "AUDIO_TEXT");
  const [showTextChannel, setShowTextChannel] = useState(true);
  const [showAudioTextChannel, setShowAudioTextChannel] = useState(true);

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
        showChildren={showTextChannel}
      >
        {textOnlyChannels.map((subChannel) => (
          <DiscordSubChannel
            key={subChannel.id}
            value={subChannel}
            highLight={false}
            active={value?.id === subChannel.id}
            onClick={() => onChange(subChannel)}
            icon={<SharpIcon width={20} />}
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
        showChildren={showAudioTextChannel}
      >
        {audioTextChannels.map((subChannel) => (
          <DiscordSubChannel
            key={subChannel.id}
            value={subChannel}
            highLight={false}
            active={value?.id === subChannel.id}
            onClick={() => onChange(subChannel)}
            icon={<SpeakerIcon width={20} />}
          />
        ))}
      </CategoryList>
    </ul>
  );
};
