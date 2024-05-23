/**
 * github 第三方 接口
 */
const router = require("koa-router")();
const {heat} = require('../../controller/Reptile/heat')

router.prefix("/api"); //路由前缀
router.get("/gitList", async (ctx, next) => {

  ctx.body = await heat(ctx.query.after);
});

module.exports = router;