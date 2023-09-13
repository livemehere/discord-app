import { css } from "@emotion/react";
import { forwardRef } from "react";
import SharpIcon from "@src/assets/svg/sharp.svg";
import { DefaultChatContent } from "@src/components/DefaultChatContent.tsx";
import { ChatItem } from "@src/components/ChatItem.tsx";
import { Chat, SubChannel } from "@src/types";

interface Props {
  value: SubChannel;
  chats: Chat[];
}

export const ChatContent = forwardRef<HTMLDivElement, Props>(
  ({ value, chats }, ref) => {
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
          <DefaultChatContent
            icon={<SharpIcon />}
            title={value.name}
            description={value.description}
          />
          {chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </section>
    );
  },
);
