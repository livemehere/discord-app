import { css } from "@emotion/react";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { CategoryList } from "@src/components/subChannel/CategoryList.tsx";
import { CommonButton } from "@src/components/common/CommonButton.tsx";
import { ReactNode } from "react";
import { SettingMenuKey, settingStore } from "@src/store/settingStore.ts";
import { CloseButton } from "@src/components/settings/CloseButton.tsx";
import { motion } from "framer-motion";
import { MyAccount } from "@src/components/settings/menu/MyAccount.tsx";
import { AudioAndVideoSetting } from "@src/components/settings/menu/AudioAndVideoSetting.tsx";

const menuList: { key: SettingMenuKey; name: string; component: ReactNode }[] =
  [
    {
      key: "myAccount",
      name: "내 계정",
      component: <MyAccount />,
    },
    {
      key: "audio",
      name: "음성 및 오디오",
      component: <AudioAndVideoSetting />,
    },
  ];

export const Settings = () => {
  const { setOpen, setSelectedMenu, selectedMenu } = settingStore();

  const getComponent = (key: SettingMenuKey) => {
    return menuList.find((menu) => menu.key === key)?.component;
  };

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
          padding-left: 10vw;
          padding-right: 12px;
        `}
      >
        <CategoryList
          toggleButton={<button>사용자 설정</button>}
          showChildren={true}
        >
          {menuList.map((menu) => (
            <CommonButton
              key={menu.key}
              css={css`
                width: 100%;
              `}
              onClick={() => setSelectedMenu(menu.key)}
              active={selectedMenu === menu.key}
              disabled={menu.key === "myAccount"}
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
        {getComponent(selectedMenu)}
      </section>
      <section
        css={css`
          padding-top: 60px;
          padding-right: 40px;
        `}
      >
        <CloseButton onClick={() => setOpen(false)} />
      </section>
    </motion.div>
  );
};
