import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type OnlineMember = { userId: string; rooms: string[] };

interface State {
  onlineMembers: OnlineMember[];
}

interface Actions {
  setOnlineMembers: (onlineMemberIds: OnlineMember[]) => void;
}

export const channelStore = create<State & Actions>()(
  devtools(
    (set) => ({
      onlineMembers: [],
      setOnlineMembers: (members) =>
        set({ onlineMembers: members }, false, "setOnlineMemberIds"),
    }),
    { name: "channelStore" },
  ),
);
