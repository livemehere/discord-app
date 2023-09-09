import { css } from "@emotion/react";
import { FC } from "react";
import { Avatar } from "@src/components/Avatar.tsx";
import { Chat } from "@shared/types/DiscordMessage";
import { motion } from "framer-motion";

interface Props {
  chat: Chat;
  onClick: () => void;
}

export const PopUpChat: FC<Props> = ({ chat, onClick }) => {
  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: 0 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
      onClick={onClick}
      css={css`
        cursor: pointer;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 80px;
        background: var(--background-300);
        border-radius: 6px;
        width: 300px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        gap: 6px;
        :hover {
          opacity: 0.9;
        }
      `}
    >
      <div
        css={css`
          position: absolute;
          left: 10px;
        `}
      >
        <Avatar size={24} />
      </div>
      <div
        css={css`
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 70%;
          white-space: nowrap;
          font-weight: bold;
        `}
      >
        {chat.body}
      </div>
    </motion.div>
  );
};
