import { FC } from "react";
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";

import { Home } from "@src/pages/Home.tsx";
import { GuildDiscovery } from "@src/pages/GuildDiscovery.tsx";

interface Props {}

export const Routes: FC<Props> = ({}) => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path={"/"}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:channelId"} element={<Home />} />
          <Route path={"/:channelId/:subChannelId"} element={<Home />} />
        </Route>
        <Route path={"/guild-discovery"} element={<GuildDiscovery />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};
