import { css } from "@emotion/react";
import { FormEvent, useState } from "react";
import AddIcon from "@src/assets/svg/add.svg";

export const ChatForm = () => {
  const [value, setValue] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(value);
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
      `}
    >
      <form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background-10);
          width: 90%;
          border-radius: 6px;
          margin: auto;
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
