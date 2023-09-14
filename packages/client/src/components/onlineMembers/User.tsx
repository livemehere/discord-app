import { FC } from "react";
import { Avatar } from "@src/components/common/Avatar.tsx";
import { useUser } from "@src/hooks/reactQueries/useUser.ts";
import { SideMenuItem } from "@src/components/common/SideMenuItem.tsx";

interface Props {
  userId: string;
  online: boolean;
}

export const User: FC<Props> = ({ userId, online }) => {
  const { user, isLoading } = useUser(userId);
  return (
    <SideMenuItem
      icon={<Avatar size={32} status={online ? "online" : "offline"} />}
    >
      {isLoading ? <div>loading...</div> : user?.username}
    </SideMenuItem>
  );
};
