import { css } from "@emotion/react";
import { FC } from "react";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { DiscordChannels } from "@src/components/channel/DiscordChannels.tsx";
import { userStore } from "@src/store/userStore.ts";
import { Channel } from "@src/types";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";

interface Props {}

export const SideBar: FC<Props> = ({}) => {
  const { user } = userStore();
  const { data: channels } = useChannels(user?.id);
  const { setChannelId, currentChannelId, setSubChannelId } = channelStore();
  const { getChannelById } = useChannels(user?.id);
  const currentChannel = getChannelById(currentChannelId);
  const { join, leave } = useSocket();

  const handleChange = (channel: Channel) => {
    // 이전 채널에서 나가고 새로운 채널에 들어감
    if (currentChannel) {
      leave(currentChannel.id);
    }
    setChannelId(channel.id);
    join(channel.id + "-channel");

    // 채널을 선택하면 가장 첫번째 텍스트 채널을 선택함
    setSubChannelId(channel.subChannels.find((sub) => sub.type === "TEXT")!.id);
  };

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <DiscordChannels
        list={channels}
        value={currentChannel}
        onChange={handleChange}
      />
    </div>
  );
};
