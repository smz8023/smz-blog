const router = require('koa-router')();
const {PostRelease} = require('../controller/release/index')
router.prefix("/api"); //路由前缀

router.post('/release',async (ctx, next) => {

  ctx.body = await PostRelease(ctx);

})


module.exports = router