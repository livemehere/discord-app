import { SocketProvider } from "@src/providers/SocketProvider/Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@src/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@src/providers/ModalProvider/Provider.tsx";
import { Discord } from "@src/Disrod.tsx";

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalProvider>
        <SocketProvider url={config.SERVER_URL}>
          <Discord />
        </SocketProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
