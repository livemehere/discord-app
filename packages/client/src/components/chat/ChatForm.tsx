import { css } from "@emotion/react";
import { FC, FormEvent, useState } from "react";
import AddIcon from "@src/assets/svg/add.svg";

interface Props {
  onSubmit: (value: string) => void;
}

export const ChatForm: FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding-bottom: 20px;
        background: var(--background-100);
      `}
    >
      <form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          align-items: center;
          background: var(--background-10);
          width: 94%;
          border-radius: 6px;
          margin: auto;
          padding-left: 8px;
        `}
      >
        <button
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          type={"button"}
        >
          <AddIcon color={"var(--gray-200)"} />
        </button>
        <input
          css={css`
            padding: 11px 8px 11px 2px;
            width: 90%;
            line-height: 120%;
            transform: translateY(1px);
            background: transparent;
          `}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={"#메세지 보내기"}
        />
      </form>
    </div>
  );
};
