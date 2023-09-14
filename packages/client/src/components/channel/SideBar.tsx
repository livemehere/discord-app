import { css } from "@emotion/react";
import { FC } from "react";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { userStore } from "@src/store/userStore.ts";
import { Channel } from "@src/types";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { DiscordSideButton } from "@src/components/channel/DiscordSideButton.tsx";
import AddIcon from "@src/assets/svg/add.svg";
import ExploreIcon from "@src/assets/svg/explore.svg";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { CreateChannelModalContent } from "@src/components/modals/CreateChannelModalContent.tsx";

interface Props {}

export const SideBar: FC<Props> = ({}) => {
  const { user } = userStore();
  const { data: channels } = useChannels(user?.id);
  const { setChannelId, currentChannelId, setSubChannelId } = channelStore();
  const { getChannelById } = useChannels(user?.id);
  const currentChannel = getChannelById(currentChannelId);
  const { join, leave } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { pushModal, closeModal } = useModal();

  const handleChange = (channel: Channel) => {
    navigate("/");
    const channelRoom = channel.id + "-channel";
    const currentChannelRoom = currentChannel?.id + "-channel";
    // 이전 채널에서 나가고 새로운 채널에 들어감
    if (currentChannel) {
      leave(currentChannelRoom);
    }
    setChannelId(channel.id);
    join(channelRoom);

    // 채널을 선택하면 가장 첫번째 텍스트 채널을 선택함
    setSubChannelId(channel.subChannels.find((sub) => sub.type === "TEXT")!.id);
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
          active={
            location.pathname === "/" && currentChannel?.id === channel.id
          }
          onClick={() => handleChange(channel)}
        >
          <h2>{channel.name.slice(0, 1)}</h2>
        </DiscordSideButton>
      ))}
      <DiscordSideButton onClick={handleCreateChannel}>
        <AddIcon />
      </DiscordSideButton>
      <DiscordSideButton
        onClick={() => navigate("guild-discovery")}
        active={location.pathname === "/guild-discovery"}
      >
        <ExploreIcon />
      </DiscordSideButton>
    </nav>
  );
};
