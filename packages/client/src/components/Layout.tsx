import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { SideBar } from "@src/components/channel/SideBar.tsx";

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
      <SideBar />
      {children}
    </div>
  );
};
