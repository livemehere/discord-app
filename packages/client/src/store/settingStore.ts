import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type SettingMenuKey = "myAccount" | "audio";

interface State {
  open: boolean;
  selectedMenu: SettingMenuKey;
  mic: boolean;
  sound: boolean;
  audioDeviceId?: string;
  audioDeviceList: MediaDeviceInfo[];
}

interface Actions {
  setOpen: (v: boolean) => void;
  setSelectedMenu: (v: SettingMenuKey) => void;
  openSettingWith: (selectedMenu: SettingMenuKey) => void;
  setMic: (v: boolean) => void;
  setSound: (v: boolean) => void;
  setAudioDeviceId: (v: string) => void;
  setAudioDeviceList: (v: MediaDeviceInfo[]) => void;
}

export const settingStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        open: false,
        selectedMenu: "myAccount",
        mic: false,
        sound: false,
        audioDeviceId: undefined,
        audioDeviceList: [],
        setOpen: (v) => set({ open: v }, false, "setOpen"),
        openSettingWith: (selectedMenu) =>
          set({ open: true, selectedMenu }, false, "openSettingWith"),
        setMic: (v) => set({ mic: v }, false, "setMic"),
        setSound: (v) => set({ sound: v }, false, "setSound"),
        setAudioDeviceId: (v) =>
          set({ audioDeviceId: v }, false, "setAudioDeviceId"),
        setAudioDeviceList: (v) =>
          set({ audioDeviceList: v }, false, "setAudioDeviceList"),
        setSelectedMenu: (v) =>
          set({ selectedMenu: v }, false, "setSelectedMenu"),
      }),

      { name: "settingStore" },
    ),
    {
      name: "settingStore",
    },
  ),
);
