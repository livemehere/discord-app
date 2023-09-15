import { css } from "@emotion/react";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { userStore } from "@src/store/userStore.ts";
import { Channel } from "@src/types";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DiscordSideButton } from "@src/components/channel/DiscordSideButton.tsx";
import AddIcon from "@src/assets/svg/add.svg";
import ExploreIcon from "@src/assets/svg/explore.svg";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { CreateChannelModalContent } from "@src/components/modals/CreateChannelModalContent.tsx";

export const SideBar = () => {
  const { user } = userStore();
  const { channels } = useChannels(user?.id);

  const params = useParams();
  const currentChannelId = params.channelId;

  const { getChannelById } = useChannels(user?.id);
  const currentChannel = getChannelById(currentChannelId);
  const { join, leave } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { pushModal, closeModal } = useModal();

  const handleChange = (channel: Channel) => {
    const channelRoom = channel.id + "-channel";
    const currentChannelRoom = currentChannel?.id + "-channel";
    // 이전 채널에서 나가고 새로운 채널에 들어감
    if (currentChannel) {
      leave(currentChannelRoom);
    }
    join(channelRoom);

    // 채널을 선택하면 가장 첫번째 텍스트 채널을 선택함
    const firstTextChannel = channel.subChannels.find(
      (sub) => sub.type === "TEXT",
    )!.id;
    navigate(`/${channel.id}/${firstTextChannel}`);
  };

  const handleCreateChannel = () => {
    const key = pushModal(
      <CreateChannelModalContent close={() => closeModal(key)} />,
    );
  };

  return (
    <nav
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 12px;
        width: 72px;
      `}
    >
      {channels?.map((channel) => (
        <DiscordSideButton
          key={channel.id}
          active={currentChannelId === channel.id}
          onClick={() => handleChange(channel)}
        >
          <h2>{channel.name.slice(0, 1)}</h2>
        </DiscordSideButton>
      ))}
      <DiscordSideButton onClick={handleCreateChannel}>
        <AddIcon />
      </DiscordSideButton>
      <DiscordSideButton
        onClick={() => navigate("/guild-discovery")}
        active={location.pathname === "/guild-discovery"}
      >
        <ExploreIcon />
      </DiscordSideButton>
    </nav>
  );
};
