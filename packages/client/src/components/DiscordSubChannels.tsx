import { FC } from "react";
import { SubChannel } from "@shared/types/DiscordMessage";
import { DiscordSubChannel } from "@src/components/DiscordSubChannel.tsx";
import { css } from "@emotion/react";

interface Props {
  list: SubChannel[];
  value: SubChannel | null;
  onChange: (subChannel: SubChannel) => void;
}

export const DiscordSubChannels: FC<Props> = ({ list, onChange, value }) => {
  return (
    <ul
      css={css`
        padding: 0 8px;
      `}
    >
      {list.map((subChannel) => (
        <DiscordSubChannel
          key={subChannel.id}
          value={subChannel}
          highLight={false}
          active={value?.id === subChannel.id}
          onClick={() => onChange(subChannel)}
        />
      ))}
    </ul>
  );
};