import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      {children}
    </div>
  );
};
