import { useQuery } from "@tanstack/react-query";
import { getChannels } from "@src/api";

export const useChannels = () => {
  return useQuery(["channels"], () => getChannels());
};
