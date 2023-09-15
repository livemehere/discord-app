import { css } from "@emotion/react";
import { channelStore } from "@src/store/channelStore.ts";
import { useChannels } from "@src/hooks/reactQueries/useChannels.ts";
import { userStore } from "@src/store/userStore.ts";
import { User } from "@src/components/onlineMembers/User.tsx";
import { useParams } from "react-router-dom";

export const OnlineMemberList = () => {
  const { user } = userStore();
  const { onlineMemberIds } = channelStore();
  const params = useParams();
  const currentChannelId = params.channelId;

  const { getChannelById } = useChannels(user?.id);
  const currentChannel = getChannelById(currentChannelId);

  const offlineMemberIds =
    currentChannel?.members.filter(
      (member) => !onlineMemberIds.includes(member.userId),
    ) ?? [];

  return (
    <div
      css={css`
        width: 240px;
        background-color: rgb(43, 45, 49);
        h3 {
          color: rgb(148, 155, 164);
          font-size: 12px;
          padding: 24px 8px 0 16px;
          margin-bottom: 6px;
        }
      `}
    >
      <h3>온라인 — {onlineMemberIds.length}</h3>
      {onlineMemberIds.map((userId) => (
        <User key={userId} userId={userId} online={true} />
      ))}

      <h3>오프라인 — {offlineMemberIds.length}</h3>
      {offlineMemberIds?.map((member) => (
        <User key={member.userId} userId={member.userId} online={false} />
      ))}
    </div>
  );
};
