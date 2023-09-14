import { SocketProvider } from "@src/providers/SocketProvider/Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@src/pages/Home.tsx";
import { config } from "@src/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@src/providers/ModalProvider/Provider.tsx";

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
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Home />} />
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
