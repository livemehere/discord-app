import { css } from "@emotion/react";
import { FC } from "react";
import { Avatar } from "@src/components/common/Avatar.tsx";
import { useUser } from "@src/hooks/reactQueries/useUser.ts";

interface Props {
  userId: string;
  online: boolean;
}

export const User: FC<Props> = ({ userId, online }) => {
  const { user, isLoading } = useUser(userId);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-left: 8px;
        margin-right: 4px;
        cursor: pointer;
        padding: 6px 4px;
        border-radius: 4px;

        ${!online &&
        css`
          opacity: 0.5;
        `}

        :hover {
          opacity: 1;
          background-color: rgb(54, 57, 63);
          span {
            color: white;
          }
        }
      `}
    >
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <div
            css={css`
              padding: 1px 8px;
            `}
          >
            <Avatar size={32} />
          </div>
          <span
            css={css`
              color: rgb(148, 155, 164);
            `}
          >
            {user?.username}
          </span>
        </>
      )}
    </div>
  );
};
