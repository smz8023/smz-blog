const {validator} = require('./validator');
const { Success } = require("../../DTO/index.js");
const {User,Comment} = require('../../db/index');

const postComment = async(ctx)=>{

  const data = await new validator().validate(ctx);
    // userId:user.id
    // const user = JSON.parse(ctx.session.user);
  const body = data.get('body');
  const result = await Comment.create(body);
  return new Success({code:0,data:{},message:"OK"})
}
// 获取评论
const getComment = async (ctx)=>{
  const data = await Comment.findAndCountAll({
    // 排序
    order:[['updatedAt','desc']],
    // 查询多少条
    limit:10,
    offset:0,
    where:{
      blogId:ctx.params.id
    },
    include:[
      {
        model:User,
      }
    ]
  })
  const result = data.rows.map(i=>{
    return {
      ...i.dataValues,
      user:i.user.dataValues,
    }
  })
  const obj = {
    result,
    pagination:{
      count:data.count
    }
  }
  return obj
}
module.exports = {
  postComment,
  getComment
};