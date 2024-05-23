/**
 * github 登录信息
 */
const router = require("koa-router")();
const { tokenResponse, getUserInfo} = require("../controller/login.js");

router.prefix("/api"); //路由前缀
router.post("/githubOuth", async (ctx, next) => {
  // console.log('ctx',ctx);
  const { client_id } = ctx.request.body;

  ctx.body = await tokenResponse(client_id,ctx);
});
router.get("/getUserInfo", async (ctx, next) => {
  const { client_id } = ctx.request.body;
  ctx.body = await getUserInfo(ctx);
});
module.exports = router;
