import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@src/api";

export const CHANNELS_KEY = "channels";
export const useChannels = (userId?: string) => {
  return useQuery([CHANNELS_KEY, userId], () => getChannels(userId!), {
    enabled: !!userId,
  });
};
