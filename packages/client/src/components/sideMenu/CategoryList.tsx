import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  toggleButton: ReactNode;
  showChildren: boolean;
}

export const CategoryList: FC<Props> = ({
  children,
  toggleButton,
  showChildren,
}) => {
  return (
    <div
      css={css`
        margin-top: 20px;
      `}
    >
      <div
        css={css`
          color: var(--text-muted);
          font-size: 12px;
          margin-bottom: 6px;
        `}
      >
        {toggleButton}
      </div>
      <div>{showChildren && children}</div>
    </div>
  );
};
