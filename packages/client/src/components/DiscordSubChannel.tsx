import { css } from "@emotion/react";
import { FC } from "react";
import SharpIcon from "@src/assets/svg/sharp.svg";
import { SubChannel } from "@shared/types/DiscordMessage";

interface Props {
  value: SubChannel;
  active: boolean;
  onClick?: (subChannel: SubChannel) => void;
}

export const DiscordSubChannel: FC<Props> = ({ value, active, onClick }) => {
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
        ${active &&
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
