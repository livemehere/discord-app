import { useContext } from "react";
import { SocketContext } from "@src/providers/SocketProvider/Provider.tsx";

export const useSocket = () => useContext(SocketContext);
