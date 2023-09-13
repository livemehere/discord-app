import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  currentChannelId: string | null;
  currentSubChannelId: string | null;
}

interface Actions {
  setChannelId: (channel: string) => void;
  setSubChannelId: (subChannel: string) => void;
}

export const channelStore = create<State & Actions>()(
  devtools(
    (set) => ({
      currentChannelId: null,
      currentSubChannelId: null,
      setChannelId: (id) =>
        set(
          {
            currentChannelId: id,
          },
          false,
          "setChannel",
        ),
      setSubChannelId: (id) =>
        set({ currentSubChannelId: id }, false, "setSubChannel"),
    }),
    { name: "channelStore" },
  ),
);
