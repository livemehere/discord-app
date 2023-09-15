import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@src/api";
import { useCallback } from "react";
import { Channel } from "@src/types";

export const CHANNELS_KEY = "channels";
export const useChannels = (userId?: string) => {
  const result = useQuery([CHANNELS_KEY, userId], () => getChannels(userId!), {
    enabled: !!userId,
  });

  const getChannelById = useCallback(
    (id?: string | null) => {
      return result.data?.find((channel) => channel.id === id);
    },
    [result.data],
  );

  const getSubChannelById = useCallback(
    (subChannelId?: string | null, channel?: Channel) => {
      return channel?.subChannels.find(
        (subChannel) => subChannel.id === subChannelId,
      );
    },
    [result.data],
  );

  return {
    ...result,
    getChannelById,
    getSubChannelById,
  };
};
