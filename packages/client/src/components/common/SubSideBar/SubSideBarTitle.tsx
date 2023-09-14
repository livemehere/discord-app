import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SubSideBarTitle: FC<Props> = ({ children }) => {
  return (
    <h3
      css={css`
        font-size: 24px;
        color: rgb(242, 243, 245);
        margin: 16px 0 16px 16px;
      `}
    >
      {children}
    </h3>
  );
};
