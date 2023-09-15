import { FC, useState } from "react";
import { Layout } from "@src/components/Layout.tsx";
import { SubSideBar } from "@src/components/common/SubSideBar/SubSideBar.tsx";
import { SubSideBarTitle } from "@src/components/common/SubSideBar/SubSideBarTitle.tsx";
import { SideMenuItem } from "@src/components/common/SideMenuItem.tsx";
import ExploreIcon from "@src/assets/svg/explore.svg";
import { css } from "@emotion/react";
import { DiscoverySearchHeader } from "@src/components/discovery/DiscoverySearchHeader.tsx";
import { useDebounceValue } from "@src/hooks/useDebounceValue.ts";
import { useSearchChannels } from "@src/hooks/reactQueries/useSearchChannels.ts";
import { ChannelCard } from "@src/components/discovery/ChannelCard.tsx";

interface Props {}

const menuItems = [
  {
    name: "홈",
    icon: <ExploreIcon />,
  },
];

export const GuildDiscovery: FC<Props> = ({}) => {
  const [activeMenu, setActiveMenu] = useState(menuItems[0]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 500);
  const { channels } = useSearchChannels(debouncedQuery);

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
      <div
        css={css`
          padding: 32px 16px 32px 32px;
          flex: 1;
        `}
      >
        <DiscoverySearchHeader value={query} onChange={setQuery} />
        <h3
          css={css`
            margin-top: 16px;
          `}
        >
          검색 결과
        </h3>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
            grid-gap: 16px;
          `}
        >
          {channels?.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
