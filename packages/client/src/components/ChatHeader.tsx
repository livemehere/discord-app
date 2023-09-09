import { css } from "@emotion/react";
import { FC } from "react";
import { DiscordSubChannel } from "@src/components/DiscordSubChannel.tsx";
import { SubChannel } from "@shared/types/DiscordMessage";

interface Props {
  value: SubChannel;
}

export const ChatHeader: FC<Props> = ({ value }) => {
  return (
    <section
      css={css`
        height: 32px;
        padding: 8px;
        display: flex;
        align-items: center;
        border-top: 1px solid var(--border-black);
        border-bottom: 1px solid var(--border-black);
      `}
    >
      <DiscordSubChannel value={value} active={true} />
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
