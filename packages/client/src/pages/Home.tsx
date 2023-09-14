import { Layout } from "@src/components/Layout.tsx";
import { SideBar } from "@src/components/channel/SideBar.tsx";
import { SubSideBar } from "@src/components/subChannel/SubSideBar.tsx";
import { ChatContainer } from "@src/components/chat/ChatContainer.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "@src/store/userStore.ts";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { getUserByName, signUp } from "@src/api";
import { channelStore } from "@src/store/channelStore.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";

export function Home() {
  const { user, setUser } = userStore();
  const [params] = useSearchParams();
  const { connect, join, connected } = useSocket();
  const { currentChannelId, setOnlineMemberIds } = channelStore();

  // 1.url 로 username 입력받음
  useEffect(() => {
    const username = params.get("username");
    if (!username) {
      const newUsername = window.prompt("닉네임을 입력해주세요");
      if (!newUsername) return;
      window.location.href = `/?username=${newUsername}`;
      return;
    }
    signUp(username)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        getUserByName(username).then((user) => {
          setUser(user);
        });
      });
  }, []);

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
      <SideBar />
      <SubSideBar />
      <ChatContainer />
    </Layout>
  );
}
