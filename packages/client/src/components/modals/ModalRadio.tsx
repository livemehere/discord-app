import { css } from "@emotion/react";
import { ReactNode } from "react";

interface Props<T> {
  value: T;
  onChange: (value: T) => void;
  list: { label: string; value: T; desc?: string; icon: ReactNode }[];
}

export const ModalRadio = <T extends string>({
  value,
  onChange,
  list,
}: Props<T>) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      {list.map((item) => (
        <div
          key={item.value}
          onClick={() => onChange(item.value)}
          css={css`
            background: rgb(43, 45, 49);
            padding: 8px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            color: var(--text-muted);
            font-weight: 500;
            ${value === item.value &&
            css`
              color: var(--text-active);
              background: rgba(255, 255, 255, 0.04);
            `}
          `}
        >
          {item.icon}
          <div>
            <span>{item.label}</span>
            {item.desc && (
              <p
                css={css`
                  font-size: 14px;
                  margin-top: 4px;
                  color: var(--text-muted);
                `}
              >
                {item.desc}
              </p>
            )}
          </div>
          <div
            css={css`
              margin-left: auto;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid var(--text-muted);
              ${value === item.value &&
              css`
                border: 2px solid var(--text-active);
                > div {
                  display: block !important;
                }
              `}
              display: flex;
              align-items: center;
              justify-content: center;
              div {
                display: none;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--text-active);
              }
            `}
          >
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};
