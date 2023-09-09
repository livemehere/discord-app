import { FC } from "react";
import { Channel } from "@shared/types/DiscordMessage";
import { DiscordChannel } from "@src/components/DiscordChannel.tsx";
import { css } from "@emotion/react";

interface Props {
  list: Channel[];
  value: Channel | null;
  onChange: (channel: Channel) => void;
}

export const DiscordChannels: FC<Props> = ({ list, onChange, value }) => {
  return (
    <nav
      css={css`
        margin-top: 12px;
        width: 72px;
      `}
    >
      {list.map((channel) => (
        <DiscordChannel
          key={channel.id}
          channel={channel}
          active={value?.id === channel.id}
          onClick={() => onChange(channel)}
        />
      ))}
    </nav>
  );
};
