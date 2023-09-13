import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@src/types";

interface State {
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
}

export const userStore = create<State & Actions>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }, false, "setUser"),
    }),
    { name: "userStore" },
  ),
);
