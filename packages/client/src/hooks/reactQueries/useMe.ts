import { useQuery } from "@tanstack/react-query";
import { getMe } from "@src/api";

export const useMe = () => {
  return useQuery(["me"], () => getMe());
};
