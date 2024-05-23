const router = require('koa-router')();
const {getBlogList,getBlogDetail}  = require('../controller/blogList/index');
router.prefix('/api')

router.get('/blogList', async (ctx, next) => {
    const data = await getBlogList(ctx, next)
    ctx.body={
      data,
      code:0
    }
})
router.get('/blogList/:id', async (ctx, next) => {
  const data = await getBlogDetail(ctx, next)
  ctx.body={
    data,
    code:0
  }
})

module.exports = router