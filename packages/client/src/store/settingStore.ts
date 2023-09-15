import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  open: boolean;
  mic: boolean;
  sound: boolean;
}

interface Actions {
  setOpen: (v: boolean) => void;
  setMic: (v: boolean) => void;
  setSound: (v: boolean) => void;
}

export const settingStore = create<State & Actions>()(
  devtools(
    (set) => ({
      open: false,
      mic: false,
      sound: false,
      setOpen: (v) => set({ open: v }, false, "setOpen"),
      setMic: (v) => set({ mic: v }, false, "setMic"),
      setSound: (v) => set({ sound: v }, false, "setSound"),
    }),
    { name: "settingStore" },
  ),
);
