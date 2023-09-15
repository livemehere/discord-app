import { useQuery } from "@tanstack/react-query";
import { searchChannels } from "@src/api";

export const useSearchChannels = (q: string) => {
  const { data, isLoading, error } = useQuery(
    ["searchChannels", q],
    () => searchChannels(q),
    {
      cacheTime: 1000 * 10,
      staleTime: 1000 * 10,
    },
  );

  return { channels: data, isLoading, error };
};
