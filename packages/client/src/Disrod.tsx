import { useEffect } from "react";
import { Routes } from "@src/pages/Routes.tsx";
import { userStore } from "@src/store/userStore.ts";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { LoginModal } from "@src/components/modals/LoginModal.tsx";
import { CHANNELS_KEY } from "@src/hooks/reactQueries/useChannels.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "@src/components/settings/Settings.tsx";
import { settingStore } from "@src/store/settingStore.ts";
import { AnimatePresence } from "framer-motion";

export const Discord = () => {
  const { login, user } = userStore();
  const { open } = settingStore();
  const { pushModal, closeModal } = useModal();
  const { connect, join, connected } = useSocket();
  const { setOnlineMemberIds } = channelStore();
  const queryClient = useQueryClient();

  // 2.유저 로그인 되면 소켓 연결
  useEffect(() => {
    if (!user) return;
    connect(user.id);
  }, [user]);

  // 3. 소켓 연결되면 'all' 방 연결
  useEffect(() => {
    if (connected) {
      join("all");
    }
  }, [connected]);

  useSocketEvent("online-members", (ids) => {
    console.log("채널 멤버들의 온라인상태가 변경되었습니다.");
    setOnlineMemberIds(ids);
    queryClient.invalidateQueries([CHANNELS_KEY]);
  });

  // 1.url 로 username 입력받음
  useEffect(() => {
    if (!login) {
      const key = pushModal(<LoginModal close={() => closeModal(key)} />);
    }
  }, [login]);

  return (
    <>
      <AnimatePresence>{open && <Settings />}</AnimatePresence>
      <Routes />
    </>
  );
};
