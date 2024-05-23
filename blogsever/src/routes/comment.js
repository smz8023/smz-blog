const router = require('koa-router')();
const {postComment,getComment}  = require('../controller/comment/index');
router.prefix('/api')
router.post('/comment', async (ctx, next) => {
  const data = await postComment(ctx, next)
  ctx.body={
    data,
    code:0
  }
})
router.get('/comment/:id',async (ctx, next)=>{
  const data = await getComment(ctx, next)
  ctx.body={
    data,
    code:0
  }
})
module.exports = router