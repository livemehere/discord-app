import cors from "@koa/cors";
import Koa from "koa";
import Router from "koa-router";

const PORT = 3000;
const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = "health check";
});

app.use(cors());
app.use(router.routes());
app.listen(PORT, () => {
  console.log(`🚀 server is running on ${PORT}`);
});
