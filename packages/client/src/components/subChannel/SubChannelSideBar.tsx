import { css } from "@emotion/react";
import { DiscordSubChannels } from "@src/components/subChannel/DiscordSubChannels.tsx";
import { channelStore } from "@src/store/channelStore.ts";
import { BottomMenu } from "@src/components/subChannel/BottomMenu.tsx";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { userStore } from "@src/store/userStore.ts";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";

export const SubChannelSideBar = () => {
  const { currentChannelId, setSubChannelId, currentSubChannelId } =
    channelStore();
  const { user } = userStore();
  const { getChannelById, getSubChannelById } = useChannels(user?.id);
  const currentChannel = getChannelById(currentChannelId);
  const currentSubChannel = getSubChannelById(
    currentSubChannelId,
    currentChannel,
  );

  return (
    <SubSideBar>
      <h3
        css={css`
          padding: 13.8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.36);
        `}
      >
        {currentChannel?.name ?? "채널을 선택해주세요"}
      </h3>
      <DiscordSubChannels
        value={currentSubChannel}
        list={currentChannel?.subChannels || []}
        onChange={(subChannel) => setSubChannelId(subChannel.id)}
      />
      <BottomMenu />
    </SubSideBar>
  );
};
