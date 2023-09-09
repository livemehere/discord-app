import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  token: string | null;
}

interface Actions {
  setToken: (token: string) => void;
}

export const userStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }, false, "setToken"),
      }),
      { name: "userStore" },
    ),
    {
      name: "userStore",
    },
  ),
);
