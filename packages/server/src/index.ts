import Fastify from "fastify";
import * as process from "process";
import cors from "@fastify/cors";
import fastifySocketIo from "fastify-socket.io";

import apiRouter from "./routes";
import wsRouter from "./routes/ws";

const PORT = 3000;
const fastify = Fastify({
  logger: true,
});

fastify.register(cors);
fastify.register(fastifySocketIo, { cors: {} });
fastify.register(apiRouter, { prefix: "/api" });
fastify.register(wsRouter);

async function run() {
  try {
    await fastify.listen({ port: PORT });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
}
run();
