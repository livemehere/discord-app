import { css } from "@emotion/react";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import ArrowDownIcon from "@public/svg/arrow-down.svg";

interface Props {
  children: ReactNode;
  active: boolean;
}

export const CategoryButton: FC<
  Props & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, active, ...props }) => {
  return (
    <button
      css={css`
        display: flex;
        align-items: center;

        svg {
          width: 12px;
          height: 12px;
          ${!active &&
          css`
            transform: rotate(180deg);
          `}
        }
      `}
      {...props}
    >
      <ArrowDownIcon />
      {children}
    </button>
  );
};
