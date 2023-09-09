import { FC, useEffect, useRef, useState } from "react";
import { ChatContent } from "@src/components/ChatContent.tsx";
import { ChatForm } from "@src/components/ChatForm.tsx";
import { ChatHeader } from "@src/components/ChatHeader.tsx";
import { Chat, SubChannel } from "@shared/types/DiscordMessage";
import { useSocket } from "@src/providers/socketProviders/hooks/useSocket.ts";
import { css } from "@emotion/react";
import { PopUpChat } from "@src/components/PopUpChat.tsx";

interface Props {
  subChannel: SubChannel;
}

export const DiscordChat: FC<Props> = ({ subChannel }) => {
  const { socket } = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popUpLastMessage, setPopUpLastMessage] = useState(false);

  const scrollBottom = (force?: boolean) => {
    const container = containerRef.current;
    if (!container) return;
    if (!force) {
      const diff = Math.abs(container.scrollTop - container.scrollHeight);
      if (diff > 1200) {
        setPopUpLastMessage(true);
        return;
      }
    }

    containerRef.current?.scrollTo({
      behavior: "smooth",
      top: containerRef.current?.scrollHeight,
    });
  };

  const handleSubmit = (value: string) => {
    if (!socket) return;
    const newChat: Chat = {
      id: Date.now().toString(),
      userId: "testId",
      body: value,
      createdAt: Date.now(),
      subChannelId: subChannel.id,
    };
    socket.emit("message", newChat);
  };

  const handleClickPopUpMessage = () => {
    setTimeout(() => {
      scrollBottom(true);
      setPopUpLastMessage(false);
    }, 100);
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("join", subChannel.id.toString());

    socket.on("message", (chat: Chat) => {
      setChats((prev) => [...prev, chat]);

      setTimeout(() => {
        scrollBottom();
      }, 100);
    });

    return () => {
      socket.off("join");
      socket.off("message");
    };
  }, [socket, subChannel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = () => {
      const diff = Math.abs(container.scrollTop - container.scrollHeight);
      if (diff < 1000) {
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
          key={chats[chats.length - 1].id}
          chat={chats[chats.length - 1]}
          onClick={handleClickPopUpMessage}
        />
      )}
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};
