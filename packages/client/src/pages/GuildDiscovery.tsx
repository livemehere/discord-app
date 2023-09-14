import { FC, useState } from "react";
import { Layout } from "@src/components/Layout.tsx";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { SubSideBarTitle } from "@src/components/common/SubSideBar/SubSideBarTitle.tsx";
import { SideMenuItem } from "@src/components/common/SideMenuItem.tsx";
import ExploreIcon from "@src/assets/svg/explore.svg";
import { css } from "@emotion/react";

interface Props {}

const menuItems = [
  {
    name: "홈",
    icon: <ExploreIcon />,
  },
];

export const GuildDiscovery: FC<Props> = ({}) => {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  return (
    <Layout>
      <SubSideBar>
        <SubSideBarTitle>서버 찾기</SubSideBarTitle>
        {menuItems.map((item) => {
          const isActive = activeMenu.name === item.name;
          return (
            <SideMenuItem
              key={item.name}
              icon={item.icon}
              hoverAction={isActive}
              active={isActive}
              onClick={() => setActiveMenu(item)}
              css={css`
                padding: 8px 4px;
              `}
            >
              {item.name}
            </SideMenuItem>
          );
        })}
      </SubSideBar>
    </Layout>
  );
};
