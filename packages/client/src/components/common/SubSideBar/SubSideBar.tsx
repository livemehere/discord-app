import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SubSideBar: FC<Props> = ({ children }) => {
  return (
    <div
      css={css`
        position: relative;
        width: 240px;
        background-color: var(--background-200);
      `}
    >
      {children}
    </div>
  );
};
