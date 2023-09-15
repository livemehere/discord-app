import { css } from "@emotion/react";
import { DiscordSubChannels } from "@src/components/subChannel/DiscordSubChannels.tsx";
import { BottomMenu } from "@src/components/subChannel/BottomMenu.tsx";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { userStore } from "@src/store/userStore.ts";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { SubChannel } from "@src/types";

export const SubChannelSideBar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = userStore();
  const { getChannelById, getSubChannelById } = useChannels(user?.id);

  // 채널, 서브채널 정보
  const currentChannelId = params.channelId;
  const currentSubChannelId = params.subChannelId;
  const currentChannel = getChannelById(currentChannelId);
  const currentSubChannel = getSubChannelById(
    currentSubChannelId,
    currentChannel,
  );

  const onChangeSubChannel = (subChannel: SubChannel) => {
    navigate(`/${currentChannelId}/${subChannel.id}`);
  };

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
        onChange={onChangeSubChannel}
      />
      <BottomMenu />
    </SubSideBar>
  );
};
