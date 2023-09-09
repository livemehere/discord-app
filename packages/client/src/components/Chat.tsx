import { css } from "@emotion/react";
import { FC } from "react";
import { ChatContent } from "@src/components/ChatContent.tsx";
import { ChatHeader } from "@src/components/ChatHeader.tsx";
import { channelStore } from "@src/store/channelStore.ts";

export const Chat: FC = () => {
  const { currentSubChannel } = channelStore();

  return (
    <div
      css={css`
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
        </>
      )}
    </div>
  );
};
