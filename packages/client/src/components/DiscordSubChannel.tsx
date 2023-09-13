import { css } from "@emotion/react";
import { FC, ReactNode } from "react";

import { SubChannel } from "@src/types";

interface Props {
  value: SubChannel;
  active: boolean;
  highLight: boolean;
  onClick?: (subChannel: SubChannel) => void;
  icon: ReactNode;
}

export const DiscordSubChannel: FC<Props> = ({
  value,
  active,
  onClick,
  highLight,
  icon,
}) => {
  return (
    <li
      key={value.id}
      css={css`
        padding: 6px 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        color: var(--text-muted);
        font-weight: 500;
        border-radius: 6px;
        ${active &&
        css`
          color: var(--text-active);
          background: rgba(255, 255, 255, 0.04);
        `}

        ${highLight &&
        css`
          color: var(--text-active);
        `}
      `}
      onClick={() => onClick?.(value)}
    >
      {icon}
      <span>{value.name}</span>
    </li>
  );
};
