import { FC } from "react";
import { DiscordSideButton } from "@src/components/DiscordSideButton.tsx";
import { css } from "@emotion/react";
import { Channel } from "@src/types";
import AddIcon from "@src/assets/svg/add.svg";

interface Props {
  list?: Channel[];
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
      {list?.map((channel) => (
        <DiscordSideButton
          key={channel.id}
          active={value?.id === channel.id}
          onClick={() => onChange(channel)}
        >
          <h2>{channel.name.slice(0, 1)}</h2>
        </DiscordSideButton>
      ))}
      <DiscordSideButton onClick={() => alert("생성")}>
        <AddIcon />
      </DiscordSideButton>
    </nav>
  );
};
