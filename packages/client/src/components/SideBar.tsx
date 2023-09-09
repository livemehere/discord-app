import { css } from "@emotion/react";
import { FC, useEffect } from "react";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { DiscordChannels } from "@src/components/DiscordChannels.tsx";

interface Props {}

export const SideBar: FC<Props> = ({}) => {
  const { data } = useChannels();
  const { setChannel, currentChannel } = channelStore();

  const channels = data?.channels || [];

  useEffect(() => {
    if (channels.length > 0) {
      setChannel(channels[0]);
    }
  }, [channels]);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <DiscordChannels
        list={channels}
        value={currentChannel}
        onChange={(channel) => setChannel(channel)}
      />
    </div>
  );
};
