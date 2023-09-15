import { css } from "@emotion/react";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { CategoryList } from "@src/components/subChannel/CategoryList.tsx";
import { CommonButton } from "@src/components/common/CommonButton.tsx";
import { useState } from "react";
import { settingStore } from "@src/store/settingStore.ts";
import { CloseButton } from "@src/components/settings/CloseButton.tsx";
import { motion } from "framer-motion";
import { MyAccount } from "@src/components/settings/menu/MyAccount.tsx";
import { AudioAndVideoSetting } from "@src/components/settings/menu/AudioAndVideoSetting.tsx";

const menuList = [
  {
    name: "내 계정",
    component: <MyAccount />,
  },
  {
    name: "음성 및 오디오",
    component: <AudioAndVideoSetting />,
  },
];

export const Settings = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuList[0]);
  const { setOpen } = settingStore();
  return (
    <motion.div
      initial={{ scale: 1.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 25,
        bounce: 0.4,
      }}
      exit={{ scale: 1.3, opacity: 0 }}
      css={css`
        position: fixed;
        inset: 0;
        background: var(--background-100);
        z-index: 100;
        display: flex;
      `}
    >
      <SubSideBar
        css={css`
          padding-left: 200px;
          padding-right: 12px;
        `}
      >
        <CategoryList
          toggleButton={<button>사용자 설정</button>}
          showChildren={true}
        >
          {menuList.map((menu) => (
            <CommonButton
              key={menu.name}
              css={css`
                width: 100%;
              `}
              onClick={() => setSelectedMenu(menu)}
              active={selectedMenu.name === menu.name}
            >
              {menu.name}
            </CommonButton>
          ))}
        </CategoryList>
      </SubSideBar>
      <section
        css={css`
          padding: 60px 40px 80px;
          width: 740px;
        `}
      >
        {selectedMenu.component}
      </section>
      <section
        css={css`
          padding-top: 60px;
        `}
      >
        <CloseButton onClick={() => setOpen(false)} />
      </section>
    </motion.div>
  );
};
