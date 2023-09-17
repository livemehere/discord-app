import { useEffect, useState } from "react";

export const useMediaDevices = (kind: MediaDeviceKind = "audioinput") => {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    const deviceHandler = () => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const audioInput = devices.filter((d) => d.kind === kind);
        setDeviceList(audioInput);
      });
    };
    deviceHandler();
    navigator.mediaDevices.addEventListener("devicechange", deviceHandler);

    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", deviceHandler);
    };
  }, []);

  return deviceList;
};
