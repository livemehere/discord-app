import { FC } from "react";
import { SubChannel } from "@shared/types/DiscordMessage";
import { DiscordSubChannel } from "@src/components/DiscordSubChannel.tsx";

interface Props {
  list: SubChannel[];
  value: SubChannel | null;
  onChange: (subChannel: SubChannel) => void;
}

export const DiscordSubChannels: FC<Props> = ({ list, onChange, value }) => {
  return (
    <ul>
      {list.map((subChannel) => (
        <DiscordSubChannel
          key={subChannel.id}
          value={subChannel}
          active={value?.id === subChannel.id}
          onClick={() => onChange(subChannel)}
        />
      ))}
    </ul>
  );
};
