import { FastifyPluginAsync } from "fastify";

const router: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", async () => {
    return "api plugin!";
  });
};

export default router;
