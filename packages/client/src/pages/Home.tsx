import { SubChannelSideBar } from "@src/components/subChannel/SubChannelSideBar.tsx";
import { ChatContainer } from "@src/components/chat/ChatContainer.tsx";
import { useEffect } from "react";
import { userStore } from "@src/store/userStore.ts";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { OnlineMemberList } from "@src/components/onlineMembers/OnlineMemberList.tsx";
import { Layout } from "@src/components/Layout";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { LoginModal } from "@src/components/modals/LoginModal.tsx";

export function Home() {
  const { user, login } = userStore();
  const { connect, join, connected } = useSocket();
  const { currentChannelId, setOnlineMemberIds } = channelStore();
  const { pushModal, closeModal } = useModal();

  // 1.url 로 username 입력받음
  useEffect(() => {
    if (!login) {
      const key = pushModal(<LoginModal close={() => closeModal(key)} />);
    }
  }, [login]);

  // 2.유저 로그인 되면 소켓 연결
  useEffect(() => {
    if (!user) return;
    connect(user.id);
  }, [user]);

  // 3. 소켓 연결되면 'all' 방 연결
  useEffect(() => {
    if (connected) {
      join("all");
    }
    console.log(currentChannelId);
  }, [connected]);

  useSocketEvent("online-members", (ids) => {
    setOnlineMemberIds(ids);
  });

  return (
    <Layout>
      <SubChannelSideBar />
      <ChatContainer />
      <OnlineMemberList />
    </Layout>
  );
}
