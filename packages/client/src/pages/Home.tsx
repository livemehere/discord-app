import { Layout } from "@src/components/Layout.tsx";
import { SideBar } from "@src/components/SideBar.tsx";
import { SubSideBar } from "@src/components/SubSideBar.tsx";
import { ChatContainer } from "@src/components/ChatContainer.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "@src/store/userStore.ts";
import { useSocket } from "@src/providers/socketProviders/hooks/useSocket.ts";

export function Home() {
  const { setToken, token } = userStore();
  const [params] = useSearchParams();
  const { login } = useSocket();

  // 1.임시로 URL 로 토큰 자유롭게 생성
  useEffect(() => {
    const tokenFromUrl = params.get("token");
    if (!tokenFromUrl) {
      console.log("토큰이없습니다", tokenFromUrl);
      return;
    }
    setToken(tokenFromUrl);
  }, []);

  // 2.토큰 저장되면 socket login
  useEffect(() => {
    if (!token) return;
    login(token);
  }, [token]);

  return (
    <Layout>
      <SideBar />
      <SubSideBar />
      <ChatContainer />
    </Layout>
  );
}
