import { SubChannelSideBar } from "@src/components/subChannel/SubChannelSideBar.tsx";
import { ChatContainer } from "@src/components/chat/ChatContainer.tsx";
import { OnlineMemberList } from "@src/components/onlineMembers/OnlineMemberList.tsx";
import { Layout } from "@src/components/Layout";

export function Home() {
  return (
    <Layout>
      <SubChannelSideBar />
      <ChatContainer />
      <OnlineMemberList />
    </Layout>
  );
}
