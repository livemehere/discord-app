import { FC, useState } from "react";
import { Layout } from "@src/components/Layout.tsx";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { SubSideBarTitle } from "@src/components/common/SubSideBar/SubSideBarTitle.tsx";
import { SideMenuItem } from "@src/components/common/SideMenuItem.tsx";
import ExploreIcon from "@src/assets/svg/explore.svg";
import SearchIcon from "@src/assets/svg/search.svg";
import { css } from "@emotion/react";
import { CommonInput } from "@src/components/discovery/CommonInput.tsx";

interface Props {}

const menuItems = [
  {
    name: "홈",
    icon: <ExploreIcon />,
  },
];

export const GuildDiscovery: FC<Props> = ({}) => {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const [search, setSearch] = useState("");
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
      <div>
        <CommonInput
          css={css`
            width: 500px;
          `}
          value={search}
          placeholder={"커뮤니티 살펴보기"}
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon />}
        />
      </div>
    </Layout>
  );
};
