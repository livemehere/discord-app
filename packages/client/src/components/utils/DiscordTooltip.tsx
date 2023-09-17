import { FC } from "react";
import Tooltip from "rc-tooltip";
import { TooltipProps } from "rc-tooltip/lib/Tooltip";

interface Props extends TooltipProps {}

export const DiscordTooltip: FC<Props> = ({ children, ...props }) => {
  return (
    <Tooltip trigger={["hover"]} placement={"top"} {...props}>
      {children}
    </Tooltip>
  );
};
