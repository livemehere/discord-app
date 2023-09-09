import { css } from "@emotion/react";
import { DiscordSubChannels } from "@src/components/DiscordSubChannels.tsx";
import { channelStore } from "@src/store/channelStore.ts";
import { BottomMenu } from "@src/components/BottomMenu.tsx";

export const SubSideBar = () => {
  const { currentChannel, setSubChannel, currentSubChannel } = channelStore();
  const subChannels = currentChannel?.subChannels ?? [];
  return (
    <div
      css={css`
        position: relative;
        width: 240px;
        background-color: var(--background-200);
      `}
    >
      <DiscordSubChannels
        value={currentSubChannel}
        list={subChannels}
        onChange={setSubChannel}
      />
      <BottomMenu />
    </div>
  );
};
