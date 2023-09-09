import { useQuery } from "@tanstack/react-query";
import { getMe } from "@src/api";

export const useMe = (token: string) => {
  return useQuery(["me", token], () => getMe(token));
};
