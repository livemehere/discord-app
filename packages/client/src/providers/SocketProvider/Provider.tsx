import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
  url: string;
}

interface SocketContextValue {
  socket?: Socket;
  connected: boolean;
  connect: (userId: string) => void;
  join: (rooms: string | string[]) => void;
  leave: (room: string) => void;
  emit: <T>(event: string, data: T) => void;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: undefined,
  connected: false,
  connect: () => {},
  join: () => {},
  leave: () => {},
  emit: () => {},
});

export const SocketProvider: FC<SocketProviderProps> = ({ children, url }) => {
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);

  const connect = (userId: string) => {
    if (socket) return;
    const client = io(url, {
      auth: {
        token: userId,
      },
      transports: ["websocket"],
    });
    setSocket(client);
  };

  const join = (rooms: string | string[]) => {
    if (!socket) return;
    socket.emit("join", Array.isArray(rooms) ? rooms : [rooms]);
  };

  const leave = (room: string) => {
    if (!socket) return;
    socket.emit("leave", room);
  };

  const emit = <T = any,>(event: string, data: T) => {
    if (!socket) return;
    socket.emit(event, data);
  };

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
    <SocketContext.Provider
      value={{ socket, connected, connect, join, leave, emit }}
    >
      {children}
    </SocketContext.Provider>
  );
};
