import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalSmallTitle: FC<Props> = ({ children }) => {
  return (
    <div
      css={css`
        color: var(--text-muted);
        font-size: 12px;
        margin-bottom: 8px;
      `}
    >
      {children}
    </div>
  );
};
