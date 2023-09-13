import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@src/api";

export const useChannels = (userId?: string) => {
  return useQuery(["channels", userId], () => getChannels(userId!), {
    enabled: !!userId,
  });
};
