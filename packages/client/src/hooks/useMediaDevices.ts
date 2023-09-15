import { useEffect, useState } from "react";

export const useMediaDevices = (kind: MediaDeviceKind = "audioinput") => {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInput = devices.filter((d) => d.kind === kind);
      setDeviceList(audioInput);
    });
  }, []);

  return deviceList;
};
