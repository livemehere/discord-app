import { css } from "@emotion/react";
import { forwardRef } from "react";
import SharpIcon from "@public/svg/sharp.svg";
import SpeakerIcon from "@public/svg/speaker.svg";
import { DefaultChatContent } from "@src/components/chat/DefaultChatContent.tsx";
import { ChatItem } from "@src/components/chat/ChatItem.tsx";
import { Chat, SubChannel } from "@src/types";
import { InfiniteData } from "@tanstack/react-query";

interface Props {
  value: SubChannel;
  prevChats?: InfiniteData<Chat[]>;
  chats: Chat[];
  showDefaultChatContent: boolean;
}

export const ChatContent = forwardRef<HTMLDivElement, Props>(
  ({ showDefaultChatContent, value, prevChats, chats }, ref) => {
    return (
      <section
        ref={ref}
        css={css`
          flex: 1;
          padding: 0 20px 0 16px;
          overflow: scroll;
          height: calc(100% - 50px - 46px);
        `}
      >
        <div
          css={css`
            padding-top: 40px;
          `}
        >
          {showDefaultChatContent && (
            <DefaultChatContent
              icon={value.type === "TEXT" ? <SharpIcon /> : <SpeakerIcon />}
              title={value.name}
              description={value.description}
            />
          )}
          {prevChats?.pages.map((page) =>
            page.map((chat) => <ChatItem key={chat.id} chat={chat} />),
          )}

          {chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </section>
    );
  },
);
