import { FC, useEffect } from "react";
import { Routes } from "@src/pages/Routes.tsx";
import { userStore } from "@src/store/userStore.ts";
import { useModal } from "@src/providers/ModalProvider/hook.ts";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { channelStore } from "@src/store/channelStore.ts";
import { useSocketEvent } from "@src/providers/SocketProvider/hooks/useSocketEvent.ts";
import { LoginModal } from "@src/components/modals/LoginModal.tsx";

interface Props {}

export const Discord: FC<Props> = ({}) => {
  const { login, user } = userStore();
  const { pushModal, closeModal } = useModal();
  const { connect, join, connected } = useSocket();
  const { setOnlineMemberIds } = channelStore();

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
    setOnlineMemberIds(ids);
  });

  // 1.url 로 username 입력받음
  useEffect(() => {
    if (!login) {
      const key = pushModal(<LoginModal close={() => closeModal(key)} />);
    }
  }, [login]);
  return <Routes />;
};
