import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  open: boolean;
  mic: boolean;
  sound: boolean;
  audioDeviceId?: string;
  audioDeviceList: MediaDeviceInfo[];
}

interface Actions {
  setOpen: (v: boolean) => void;
  setMic: (v: boolean) => void;
  setSound: (v: boolean) => void;
  setAudioDeviceId: (v: string) => void;
  setAudioDeviceList: (v: MediaDeviceInfo[]) => void;
}

export const settingStore = create<State & Actions>()(
  devtools(
    (set) => ({
      open: false,
      mic: false,
      sound: false,
      audioDeviceId: undefined,
      audioDeviceList: [],
      setOpen: (v) => set({ open: v }, false, "setOpen"),
      setMic: (v) => set({ mic: v }, false, "setMic"),
      setSound: (v) => set({ sound: v }, false, "setSound"),
      setAudioDeviceId: (v) =>
        set({ audioDeviceId: v }, false, "setAudioDeviceId"),
      setAudioDeviceList: (v) =>
        set({ audioDeviceList: v }, false, "setAudioDeviceList"),
    }),
    { name: "settingStore" },
  ),
);
