import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  onlineMemberIds: string[];
}

interface Actions {
  setOnlineMemberIds: (onlineMemberIds: string[]) => void;
}

export const channelStore = create<State & Actions>()(
  devtools(
    (set) => ({
      onlineMemberIds: [],
      setOnlineMemberIds: (onlineMemberIds) =>
        set({ onlineMemberIds }, false, "setOnlineMemberIds"),
    }),
    { name: "channelStore" },
  ),
);
