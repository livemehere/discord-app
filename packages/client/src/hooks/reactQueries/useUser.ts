import { getUserById } from "@src/api";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  const { data, isLoading, error } = useQuery(
    ["user", userId],
    () => getUserById(userId),
    {
      enabled: !!userId,
    },
  );

  return {
    user: data,
    isLoading,
    error,
  };
};
