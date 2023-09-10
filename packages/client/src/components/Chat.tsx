import { FC, RefObject, useEffect, useRef, useState } from "react";
import { ChatContent } from "@src/components/ChatContent.tsx";
import { ChatForm } from "@src/components/ChatForm.tsx";
import { ChatHeader } from "@src/components/ChatHeader.tsx";
import { Chat, SubChannel } from "@shared/types/DiscordMessage";
import { useSocket } from "@src/providers/socketProviders/hooks/useSocket.ts";
import { css } from "@emotion/react";
import { PopUpChat } from "@src/components/PopUpChat.tsx";
import { userStore } from "@src/store/userStore.ts";

interface Props {
  subChannel: SubChannel;
}

export const DiscordChat: FC<Props> = ({ subChannel }) => {
  const { socket } = useSocket();
  const { token } = userStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popUpLastMessage, setPopUpLastMessage] = useState(false);

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

    const newChat: Chat = {
      id: Date.now().toString(),
      userId: token || "unknown",
      body: value,
      createdAt: Date.now(),
      subChannelId: subChannel.id,
    };
    socket.emit("message", newChat);
    scrollBottom();
  };

  const handleClickPopUpMessage = () => {
    scrollBottom();
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", subChannel.id.toString());

    socket.on("message", (chat: Chat) => {
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
      socket.off("join");
      socket.off("message");
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

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <ChatHeader value={subChannel} />
      <ChatContent value={subChannel} chats={chats} ref={containerRef} />
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
