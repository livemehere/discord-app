import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@src/types";

interface State {
  login: boolean;
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
  setLogin: (login: boolean) => void;
}

export const userStore = create<State & Actions>()(
  devtools(
    (set) => ({
      user: null,
      login: false,
      setUser: (user) => set({ user }, false, "setUser"),
      setLogin: (login) => set({ login }, false, "setLogin"),
    }),
    { name: "userStore" },
  ),
);
