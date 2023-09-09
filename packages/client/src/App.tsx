import { SocketProvider } from "@src/providers/socketProviders/Provider.tsx";
import { SideBar } from "@src/components/SideBar.tsx";
import { Layout } from "@src/components/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chat } from "@src/components/Chat.tsx";
import { SubSideBar } from "@src/components/SubSideBar.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 1000 * 60 * 30,
      staleTime: 1000 * 60 * 30,
    },
  },
});

function App() {
  return (
    <SocketProvider
      url={"http://localhost:3000"}
      fallback={<div>loading...</div>}
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <SideBar />
          <SubSideBar />
          <Chat />
        </Layout>
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App;
