import { useQuery } from "@tanstack/react-query";
import { getChats } from "@src/api";

interface Options {
  channelId: number;
  lastChatId: number;
}

export const useChats = ({ channelId, lastChatId }: Options) => {
  return useQuery(["chats", channelId, lastChatId], () =>
    getChats({ channelId, lastChatId }),
  );
};
