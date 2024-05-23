// 1.获取查询表的模型
const {Blog,User} = require('../../db/index');
const { afterSync } = require('../../db/Model/Blog');
// 2. 写具体查询逻辑
const getBlogList = async (ctx,next)=>{

 const data = await Blog.findAndCountAll({
    // 排序
    order:[['updatedAt','desc']],
    // 查询多少条
    limit:10,
    offset:0,
    // where:{
    //   userId:ctx.request.body.userId
    // },
    include:[
      {
        model:User,
        attributes:['userName','nickName'],
        // where:{
        //   id:31838004
        // },
      }
    ]
  })
  const result = data.rows.map(blog=>{
    const blogValue = blog.dataValues;
    const user = blogValue.user.dataValues;
    blogValue.user = user;
    return blogValue

  })
  return {
    result,
    count:data.count
  }
}

const getBlogDetail=async (ctx)=>{
  const data = await Blog.findOne({
    where:{
      id:ctx.params.id
    },
    include:[
      {
        model:User,
        attributes:['userName','nickName'],
      }
    ]
  })
  const result = data.dataValues;

  result.user=data.dataValues.user.dataValues;
  return result
}
module.exports = {
  getBlogList,
  getBlogDetail
}