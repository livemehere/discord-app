import { css } from "@emotion/react";
import { FC } from "react";
import { channelStore } from "@src/store/channelStore.ts";
import { DiscordChat } from "@src/components/Chat.tsx";

export const ChatContainer: FC = () => {
  const { currentSubChannel } = channelStore();

  return (
    <div
      css={css`
        position: relative;
        flex: 1;
        flex-direction: column;
        display: flex;
        background-color: var(--background-100);
        height: 100%;
      `}
    >
      {currentSubChannel && (
        <DiscordChat
          key={currentSubChannel.id}
          subChannel={currentSubChannel}
        />
      )}
    </div>
  );
};
