import { css } from "@emotion/react";
import { FC } from "react";
import { ChatContent } from "@src/components/ChatContent.tsx";
import { ChatHeader } from "@src/components/ChatHeader.tsx";
import { channelStore } from "@src/store/channelStore.ts";
import { ChatForm } from "@src/components/ChatForm.tsx";

export const Chat: FC = () => {
  const { currentSubChannel } = channelStore();

  return (
    <div
      css={css`
        position: relative;
        flex: 1;
        flex-direction: column;
        display: flex;
        background-color: var(--background-100);
      `}
    >
      {currentSubChannel && (
        <>
          <ChatHeader value={currentSubChannel} />
          <ChatContent value={currentSubChannel} />
          <ChatForm />
        </>
      )}
    </div>
  );
};
