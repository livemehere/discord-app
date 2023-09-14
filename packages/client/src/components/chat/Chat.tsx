import { FC, RefObject, useEffect, useRef, useState } from "react";
import { ChatContent } from "@src/components/chat/ChatContent.tsx";
import { ChatForm } from "@src/components/chat/ChatForm.tsx";
import { ChatHeader } from "@src/components/chat/ChatHeader.tsx";
import { useSocket } from "@src/providers/SocketProvider/hooks/useSocket.ts";
import { css } from "@emotion/react";
import { PopUpChat } from "@src/components/chat/PopUpChat.tsx";
import { userStore } from "@src/store/userStore.ts";
import { Chat, SubChannel } from "@src/types";
import { useChats } from "@src/hooks/reactQueries/useChats.ts";

interface Props {
  subChannel: SubChannel;
}

export const DiscordChat: FC<Props> = ({ subChannel }) => {
  const { socket, join, leave } = useSocket();
  const { user } = userStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popUpLastMessage, setPopUpLastMessage] = useState(false);
  const [isPrevChatLoaded, setIsPrevChatLoaded] = useState(false);

  const {
    data: prevChats,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useChats({
    subChannelId: subChannel.id,
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

  const scrollBottomImmediately = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({
      top: 100,
    });
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

    join(subChannel.id);
    socket.on("chat", (chat: Chat) => {
      setChats((prev) => [...prev, chat]);

      if (
        getScrollRatio(containerRef) > 0.8 ||
        getScrollRatio(containerRef) === 0
      ) {
        scrollBottom();
      } else {
        setPopUpLastMessage(true);
      }
    });

    return () => {
      leave(subChannel.id);
      socket.off("chat");
    };
  }, [socket, subChannel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = () => {
      const ratio = getScrollRatio(containerRef);
      if (ratio > 1) {
        setPopUpLastMessage(false);
      }
      // 스크롤을 올려 절반 이상이면 이전 채팅 20개 패칭
      if (ratio < 0.5 && isPrevChatLoaded && !isFetching) {
        fetchNextPage();
        if (hasNextPage) {
          scrollBottomImmediately();
        }
      }
    };

    container.addEventListener("scroll", handler);

    return () => {
      container.removeEventListener("scroll", handler);
    };
  }, [isPrevChatLoaded, isFetching]);

  useEffect(() => {
    if (!prevChats) return;
    if (!isPrevChatLoaded) {
      // 최초 자동 loaded 시에만 하단으로 스크롤
      scrollBottom();
    }
    setTimeout(() => {
      setIsPrevChatLoaded(true);
    }, 1000);
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
        prevChats={prevChats}
        chats={chats}
        ref={containerRef}
        showDefaultChatContent={hasNextPage === false}
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
