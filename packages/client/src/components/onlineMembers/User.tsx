import { FC, HTMLAttributes } from "react";
import { Avatar } from "@src/components/common/Avatar.tsx";
import { useUser } from "@src/hooks/reactQueries/useUser.ts";
import { SideMenuItem } from "@src/components/common/SideMenuItem.tsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  online?: boolean;
  avatarSize?: number;
  showStroke?: boolean;
  strokeColor?: string;
}

export const User: FC<Props> = ({
  userId,
  online = false,
  avatarSize = 32,
  showStroke = false,
  ...props
}) => {
  const { user, isLoading } = useUser(userId);
  return (
    <SideMenuItem
      icon={
        <Avatar
          size={avatarSize}
          status={online ? "online" : "offline"}
          showStroke={showStroke}
        />
      }
      {...props}
    >
      {isLoading ? <div>loading...</div> : user?.username}
    </SideMenuItem>
  );
};
