import { css } from "@emotion/react";
import { FC } from "react";
import { DiscordSubChannel } from "@src/components/subChannel/DiscordSubChannel.tsx";
import { SubChannel } from "@src/types";

interface Props {
  value: SubChannel;
}

export const ChatHeader: FC<Props> = ({ value }) => {
  return (
    <section
      css={css`
        position: sticky;
        top: 0;
        height: 32px;
        padding: 8px;
        display: flex;
        align-items: center;
        border-top: 1px solid var(--border-black);
        border-bottom: 1px solid var(--border-black);
        background: var(--background-100);
      `}
    >
      <DiscordSubChannel value={value} active={false} highLight={true} />
      <p
        css={css`
          color: var(--text-muted);
        `}
      >
        {value.description}
      </p>
    </section>
  );
};
