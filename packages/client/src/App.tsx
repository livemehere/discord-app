import { SocketProvider } from "@src/providers/socketProviders/Provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@src/pages/Home.tsx";
import { config } from "@src/config";

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
    <SocketProvider url={config.SERVER_URL}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SocketProvider>
  );
}

export default App;
