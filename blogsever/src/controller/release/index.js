const {PostReleaseValidator} = require('./validator');
const { Success } = require("../../DTO/index.js");
const Blog = require('../../db/Model/Blog');
const PostRelease = async(ctx)=>{

  const data =await new PostReleaseValidator().validate(ctx);
    // userId:user.id
    // const user = JSON.parse(ctx.session.user);
  const body = data.get('body');
  
  const result = await Blog.create(body);
  return new Success({code:0,data:{},message:"OK"})
}

module.exports = {
  PostRelease
};