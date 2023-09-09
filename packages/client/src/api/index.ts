import axios from "axios";
import { Channel } from "@shared/types/DiscordMessage";
import { User } from "@shared/types/User";

const SERVER_URL = "http://127.0.0.1:3000/api/";
const instance = axios.create({
  baseURL: SERVER_URL,
});

export const getMe = () =>
  instance.get<User>("users/me").then((res) => res.data);
export const getChannels = () =>
  instance
    .get<{ channels: Channel[] }>("users/channels")
    .then((res) => res.data);
