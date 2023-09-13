import { css } from "@emotion/react";
import { FC, useEffect } from "react";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { DiscordChannels } from "@src/components/DiscordChannels.tsx";
import { userStore } from "@src/store/userStore.ts";

interface Props {}

export const SideBar: FC<Props> = ({}) => {
  const { user } = userStore();
  const { data: channels } = useChannels(user?.id);
  const { setChannel, currentChannel } = channelStore();

  useEffect(() => {
    if (channels?.length) {
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
