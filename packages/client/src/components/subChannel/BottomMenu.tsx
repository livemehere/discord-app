import { css } from "@emotion/react";
import { Avatar } from "@src/components/common/Avatar.tsx";
import { GlobalSettingButtons } from "@src/components/subChannel/GlobalSettingButtons.tsx";
import { userStore } from "@src/store/userStore.ts";

export const BottomMenu = () => {
  const { user } = userStore();

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
          <h4>{user?.username}</h4>
        </div>
      </div>
      <GlobalSettingButtons />
    </div>
  );
};
