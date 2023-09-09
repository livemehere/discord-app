import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export const DefaultChatContent: FC<Props> = ({ icon, title, description }) => {
  return (
    <div
      css={css`
        margin: 16px;
      `}
    >
      <div
        css={css`
          margin-top: 16px;
          background: var(--background-50);
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            width: 42px;
            height: 42px;

            path {
              fill: white;
            }
          }
        `}
      >
        {icon}
      </div>
      <h3
        css={css`
          font-size: 32px;
          margin: 8px 0;
          color: var(--text-active);
        `}
      >
        {title}에 오신걸 환영합니다!
      </h3>
      <p
        css={css`
          margin: 0;
          color: var(--text-muted);
        `}
      >
        {title}채널의 시작이에요. {description}
      </p>
    </div>
  );
};
