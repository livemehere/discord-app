import { css } from "@emotion/react";
import { FC } from "react";
import SharpIcon from "@src/assets/svg/sharp.svg";
import { DefaultChatContent } from "@src/components/DefaultChatContent.tsx";
import { SubChannel } from "@shared/types/DiscordMessage";

interface Props {
  value: SubChannel;
}

export const ChatContent: FC<Props> = ({ value }) => {
  return (
    <section
      css={css`
        flex: 1;
        overflow-y: scroll;
      `}
    >
      <div
        css={css`
          height: 200vh;
          padding-top: 40px;
        `}
      >
        <DefaultChatContent
          icon={<SharpIcon />}
          title={value.name}
          description={value.description}
        />
      </div>
    </section>
  );
};
