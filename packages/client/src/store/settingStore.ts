import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  mic: boolean;
  sound: boolean;
}

interface Actions {
  setMic: (v: boolean) => void;
  setSound: (v: boolean) => void;
}

export const settingStore = create<State & Actions>()(
  devtools(
    (set) => ({
      mic: true,
      sound: true,
      setMic: (v) => set({ mic: v }, false, "setMic"),
      setSound: (v) => set({ sound: v }, false, "setSound"),
    }),
    { name: "settingStore" },
  ),
);
