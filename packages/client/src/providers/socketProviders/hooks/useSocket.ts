import { useContext } from "react";
import { SocketContext } from "@src/providers/socketProviders/Provider.tsx";

export const useSocket = () => useContext(SocketContext);
