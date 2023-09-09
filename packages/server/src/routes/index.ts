import { FastifyPluginAsync } from "fastify";
import { User } from "../../../shared/types/User";
import { Channel } from "../../../shared/types/DiscordMessage";

const router: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/users/me", async () => {
    return {
      id: "testId",
      username: "kong",
      createdAt: Date.now(),
      profileUrl:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    } as User;
  });

  fastify.get("/users/channels", async () => {
    return {
      channels: [
        {
          id: 1,
          name: "개발자모임",
          description: "설명입니다~",
          createdAt: Date.now(),
          subChannels: [
            {
              id: 2,
              name: "공지",
              description: "설명입니다~",
              type: "text",
              createdAt: Date.now(),
            },
            {
              id: 3,
              name: "수다",
              description: "설명입니다~",
              type: "voice",
              createdAt: Date.now(),
            },
          ],
        },
        {
          id: 4,
          name: "게임모임",
          description: "설명입니다~",
          createdAt: Date.now(),

          subChannels: [
            {
              id: 5,
              name: "공지",
              description: "설명입니다~",
              type: "text",
              createdAt: Date.now(),
            },
            {
              id: 6,
              name: "리그오브레전드",
              description: "설명입니다~",
              type: "voice",
              createdAt: Date.now(),
            },
          ],
        },
      ],
    } as { channels: Channel[] };
  });
};

export default router;
