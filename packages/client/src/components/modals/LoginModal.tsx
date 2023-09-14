import { css } from "@emotion/react";
import { FC, useEffect, useRef, useState } from "react";
import { ModalHeader } from "@src/components/modals/ModalHeader.tsx";
import { ModalInput } from "@src/components/modals/ModalInput.tsx";
import { ModalButton } from "@src/components/modals/ModalButton.tsx";
import { getUserByName, signUp } from "@src/api";
import { userStore } from "@src/store/userStore.ts";

interface Props {
  close: () => void;
}

export const LoginModal: FC<Props> = ({ close }) => {
  const { setUser, setLogin } = userStore();
  const [username, setUsername] = useState("");
  const disabled = username.length < 2;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    signUp(username)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        getUserByName(username).then((user) => {
          setUser(user);
        });
      })
      .finally(() => {
        setLogin(true);
        close();
      });
  };
  return (
    <div
      css={css`
        color: var(--border-black);
        width: 400px;
        max-width: 80vw;
        background: rgb(49, 51, 56);
        border-radius: 8px;
        padding: 12px;
      `}
    >
      <ModalHeader
        close={close}
        title={"간단히 게스트로 로그인하세요!"}
        desc={
          "사용할 닉네임을 입력하고 로그인 버튼을 누르면 채팅을 시작할 수 있어요!"
        }
      />
      <div>
        <ModalInput
          ref={inputRef}
          value={username}
          placeholder={"닉네임"}
          onChange={(e) => setUsername(e.target.value)}
          onEnter={handleLogin}
        />
      </div>
      <ModalButton
        onClick={handleLogin}
        disabled={disabled}
        css={css`
          display: block;
          margin-top: 14px;
          margin-left: auto;
        `}
      >
        로그인
      </ModalButton>
    </div>
  );
};
