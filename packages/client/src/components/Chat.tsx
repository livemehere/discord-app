import { FC, RefObject, useEffect, useRef, useState } from "react";
import { ChatContent } from "@src/components/ChatContent.tsx";
import { ChatForm } from "@src/components/ChatForm.tsx";
import { ChatHeader } from "@src/components/ChatHeader.tsx";
import { useSocket } from "@src/providers/socketProviders/hooks/useSocket.ts";
import { css } from "@emotion/react";
import { PopUpChat } from "@src/components/PopUpChat.tsx";
import { userStore } from "@src/store/userStore.ts";
import { Chat, SubChannel } from "@src/types";
import { useChats } from "@src/hooks/reactQueries/useChats.ts";

interface Props {
  subChannel: SubChannel;
}

export const DiscordChat: FC<Props> = ({ subChannel }) => {
  const { socket } = useSocket();
  const { user } = userStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popUpLastMessage, setPopUpLastMessage] = useState(false);

  const { data: prevChats } = useChats({
    subChannelId: subChannel.id,
    lastId: undefined,
  });

  const getScrollRatio = (ref: RefObject<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return 0;
    const { height } = el.getBoundingClientRect();
    const max = el.scrollHeight - height;
    const scrollY = el.scrollTop;
    if (max <= 0) return 0;
    return scrollY / max;
  };

  const scrollBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    setTimeout(() => {
      containerRef.current?.scrollTo({
        behavior: "smooth",
        top: containerRef.current?.scrollHeight,
      });
    }, 100);
  };

  const handleSubmit = (value: string) => {
    if (!socket) return;

    const newChat = {
      userId: user?.id,
      body: value,
      subChannelId: subChannel.id,
    };
    socket.emit("chat", newChat);
    scrollBottom();
  };

  const handleClickPopUpMessage = () => {
    scrollBottom();
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", subChannel.id);
    socket.on("chat", (chat: Chat) => {
      setChats((prev) => [...prev, chat]);

      if (
        getScrollRatio(containerRef) > 0.8 ||
        getScrollRatio(containerRef) === 0
      ) {
        scrollBottom();
      } else {
        console.log(chat);
        setPopUpLastMessage(true);
      }
    });

    return () => {
      socket.emit("leave", subChannel.id);
      socket.off("chat");
    };
  }, [socket, subChannel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = () => {
      if (getScrollRatio(containerRef) > 1) {
        setPopUpLastMessage(false);
      }
    };

    container.addEventListener("scroll", handler);

    return () => {
      container.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    if (!prevChats) return;
    scrollBottom();
  }, [prevChats]);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <ChatHeader value={subChannel} />
      <ChatContent
        value={subChannel}
        prevChats={prevChats ?? []}
        chats={chats}
        ref={containerRef}
      />
      {popUpLastMessage && (
        <PopUpChat
          chat={chats[chats.length - 1]}
          onClick={handleClickPopUpMessage}
        />
      )}
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};
