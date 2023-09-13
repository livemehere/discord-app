import axios from "axios";
import { config } from "@src/config";
import { Channel, Chat, User } from "@src/types";

const instance = axios.create({
  baseURL: config.SERVER_URL,
});

export const signUp = (username: string) =>
  instance.post<User>("/api/users", { username }).then((res) => res.data);

export const getUserByName = (username: string) =>
  instance.get<User>(`/api/users/username/${username}`).then((res) => res.data);

export const getChannels = (userId: string) =>
  instance
    .get<Channel[]>(`/api/users/${userId}/channels`)
    .then((res) => res.data);

export const getChats = ({
  subChannelId,
  lastId,
  size = 20,
  sort = "desc",
}: {
  subChannelId: string;
  lastId?: string;
  size?: number;
  sort?: "desc" | "asc";
}) =>
  instance
    .get<Chat[]>(`/api/chats/${subChannelId}`, {
      params: {
        lastId,
        size,
        sort,
      },
    })
    .then((res) => res.data);
