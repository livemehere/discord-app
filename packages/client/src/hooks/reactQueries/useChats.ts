import { useInfiniteQuery } from "@tanstack/react-query";
import { getChats } from "@src/api";

interface Options {
  subChannelId: string;
}

export const useChats = ({ subChannelId }: Options) => {
  return useInfiniteQuery(
    ["chats", subChannelId],
    (nextPageParam) => {
      return getChats({ subChannelId, lastId: nextPageParam.pageParam });
    },
    {
      select: (data) => {
        return {
          pages: [...data.pages.map((page) => [...page].reverse())].reverse(),
          pageParams: data.pageParams,
        };
      },
      getNextPageParam: (lastPage) => {
        return lastPage.length >= 20
          ? lastPage[lastPage.length - 1]?.id
          : undefined;
      },
    },
  );
};
