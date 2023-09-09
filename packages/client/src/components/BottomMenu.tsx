import { css } from "@emotion/react";
import { FC } from "react";
import { useMe } from "@src/hooks/reactQueries/useMe.ts";
import { Avatar } from "@src/components/Avatar.tsx";
import { GlobalSettingButtons } from "@src/components/GlobalSettingButtons.tsx";

interface Props {}

export const BottomMenu: FC<Props> = ({}) => {
  const { data } = useMe();
  return (
    <div
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1e1e1e;
        height: 52px;
        padding: 0 8px;
        display: flex;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 4px;
          padding: 4px;
          width: 122px;
          cursor: pointer;
          :hover {
            background: var(--gray-hover);
          }
        `}
      >
        <Avatar />
        <div
          css={css`
            h4 {
              font-size: 14px;
            }
            p {
              font-size: 12px;
              color: var(--text-muted);
            }
          `}
        >
          <h4>{data?.username}</h4>
          <p>{data?.id}</p>
        </div>
      </div>
      <GlobalSettingButtons />
    </div>
  );
};
