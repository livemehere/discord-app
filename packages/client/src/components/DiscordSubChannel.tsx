import { css } from "@emotion/react";
import { FC } from "react";
import SharpIcon from "@src/assets/svg/sharp.svg";
import { SubChannel } from "@shared/types/DiscordMessage";

interface Props {
  value: SubChannel;
  active: boolean;
  highLight: boolean;
  onClick?: (subChannel: SubChannel) => void;
}

export const DiscordSubChannel: FC<Props> = ({
  value,
  active,
  onClick,
  highLight,
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
      <SharpIcon width={20} />
      <span>{value.name}</span>
    </li>
  );
};
