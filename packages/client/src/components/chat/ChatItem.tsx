import { css } from "@emotion/react";
import { FC } from "react";
import { Avatar } from "@src/components/common/Avatar.tsx";
import { format } from "@src/utils/time.ts";
import { Chat } from "@src/types";
import { useUser } from "@src/hooks/reactQueries/useUser.ts";

interface Props {
  chat: Chat;
}

export const ChatItem: FC<Props> = ({ chat }) => {
  const { user } = useUser(chat.userId);

  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        padding-left: 16px;
      `}
    >
      <section>
        <Avatar />
      </section>
      <section>
        <div
          className="header"
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
            h5 {
              font-size: 16px;
            }
            p {
              color: var(--text-muted);
              font-size: 12px;
            }
          `}
        >
          <h5>{user?.username}</h5>
          <p>{format(chat.createdAt, "YYYY.MM.DD. a H:mm")}</p>
        </div>
        <p>{chat.body}</p>
      </section>
    </div>
  );
};
