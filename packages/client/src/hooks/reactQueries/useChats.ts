import { useQuery } from "@tanstack/react-query";
import { getChats } from "@src/api";

interface Options {
  subChannelId: string;
  lastId?: string;
}

export const useChats = ({ subChannelId, lastId }: Options) => {
  return useQuery(["chats", subChannelId, lastId], () =>
    getChats({ subChannelId, lastId }).then((res) => [...res].reverse()),
  );
};
