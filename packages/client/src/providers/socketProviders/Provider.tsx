import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
  url: string;
  fallback?: ReactNode;
}

interface SocketContextValue {
  socket?: Socket;
  connected: boolean;
  login: (token: string) => void;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: undefined,
  connected: false,
  login: () => {},
});

export const SocketProvider: FC<SocketProviderProps> = ({
  children,
  url,
  fallback = null,
}) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);

  const login = (token: string) => {
    if (!socket) return;
    socket.emit("login", token);
  };

  useEffect(() => {
    const socket = io(url);
    setSocket(socket);
  }, [url]);

  useEffect(() => {
    if (!socket) return;
    const connectHandler = () => {
      setConnected(true);
    };
    const disconnectHandler = () => {
      setConnected(false);
    };

    socket.on("connect", connectHandler);
    socket.on("disconnect", disconnectHandler);

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connected, login }}>
      {socket ? children : fallback}
    </SocketContext.Provider>
  );
};
