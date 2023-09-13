import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  toggleButton: ReactNode;
  showChildren: boolean;
  right?: ReactNode;
}

export const CategoryList: FC<Props> = ({
  children,
  toggleButton,
  showChildren,
  right,
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          :hover {
            color: var(--text-active);
          }
        `}
      >
        <div>{toggleButton}</div>
        <div>{right}</div>
      </div>
      <div>{showChildren && children}</div>
    </div>
  );
};
