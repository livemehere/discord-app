import { SubChannelSideBar } from "@src/components/subChannel/SubChannelSideBar.tsx";
import { ChatContainer } from "@src/components/chat/ChatContainer.tsx";
import { OnlineMemberList } from "@src/components/onlineMembers/OnlineMemberList.tsx";
import { Layout } from "@src/components/Layout";
import { userStore } from "@src/store/userStore.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CHANNELS_KEY,
  useChannels,
} from "@src/hooks/reactQueries/useChannels.ts";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { joinChannel } from "@src/api";
import { useQueryClient } from "@tanstack/react-query";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { WelcomeToChannelModal } from "@src/components/modals/WelcomeToChannelModal.tsx";

export function Home() {
  const { pushModal, closeModal } = useModal();
  const { user, login } = userStore();
  const { join } = useSocket();
  const { getChannelById, channels } = useChannels(user?.id);
  const params = useParams();
  const currentChannelId = params.channelId;
  const currentChannel = getChannelById(currentChannelId);
  const isChannelMember = currentChannel?.members.some(
    (member) => member.userId === user?.id,
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    // 채널 맴버가 아니라면 자동 가입
    if (!login || !user || !currentChannelId || channels === undefined) return;
    if (isChannelMember) {
      console.log("채널 멤버입니다", user?.username);
      join(currentChannelId + "-channel"); // 최신 온라인 멤버를 받아오기위해 다시한번 join
    } else {
      console.log("채널에 가입되지 않았습니다", user?.username);
      joinChannel(currentChannelId, user.id).then(() => {
        const key = pushModal(
          <WelcomeToChannelModal close={() => closeModal(key)} />,
        );
        queryClient.invalidateQueries([CHANNELS_KEY]);
      });
    }
  }, [login, user, isChannelMember, currentChannelId, channels]);

  return (
    <Layout>
      <SubChannelSideBar />
      <ChatContainer />
      <OnlineMemberList />
    </Layout>
  );
}
