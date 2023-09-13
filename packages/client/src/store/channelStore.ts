import { Channel, SubChannel } from "@src/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  currentChannel: Channel | null;
  currentSubChannel: SubChannel | null;
}

interface Actions {
  setChannel: (channel: Channel) => void;
  setSubChannel: (subChannel: SubChannel) => void;
}

export const channelStore = create<State & Actions>()(
  devtools(
    (set) => ({
      currentChannel: null,
      currentSubChannel: null,
      setChannel: (channel) =>
        set(
          {
            currentChannel: channel,
            currentSubChannel: channel.subChannels[0],
          },
          false,
          "setChannel",
        ),
      setSubChannel: (subChannel) =>
        set({ currentSubChannel: subChannel }, false, "setSubChannel"),
    }),
    { name: "channelStore" },
  ),
);
