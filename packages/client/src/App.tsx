import { SocketProvider } from "@src/providers/SocketProvider/Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@src/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Discord } from "@src/Disrod.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./providers/ModalProvider/Provider";

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
      <SocketProvider url={config.SERVER_URL}>
        <BrowserRouter>
          <ModalProvider>
            <Discord />
          </ModalProvider>
        </BrowserRouter>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
