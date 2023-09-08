import Fastify from "fastify";
import * as process from "process";
import cors from "@fastify/cors";

import apiRouter from "./routes";

const PORT = 3000;
const fastify = Fastify({
  logger: true,
});

fastify.register(cors);
fastify.register(apiRouter, { prefix: "/api" });

async function run() {
  try {
    await fastify.listen({ port: PORT });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}
run();
