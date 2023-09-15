import { css } from "@emotion/react";
import { FC, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SubSideBar: FC<Props> = ({ children, ...props }) => {
  return (
    <div
      css={css`
        position: relative;
        width: 240px;
        background-color: var(--background-200);
      `}
      {...props}
    >
      {children}
    </div>
  );
};
