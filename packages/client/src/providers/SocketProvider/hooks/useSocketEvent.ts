import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { useEffect, useRef } from "react";

export const useSocketEvent = <T = any>(
  event: string,
  callback: (v: T) => void,
) => {
  const { socket } = useSocket();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    socket?.on(event, callback);
    return () => {
      socket?.off(event, callback);
    };
  }, [event, callback, socket]);
};
