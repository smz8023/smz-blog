const axios = require("axios");
const { Success, Error } = require("../DTO/index.js");
const {User} = require('../db/index');
const { ClientSecret, ClientId } = require("../githubcof");
// const {set,get} = require('../catch/redis');
const tokenResponse = async (client_id,ctx) => {

  let result = await axios({
    method: "post",
    url:
      "https://github.com/login/oauth/access_token?" +
      `client_id=${ClientId}&` +
      `client_secret=${ClientSecret}&` +
      `code=${client_id}`,
    headers: {
      accept: "application/json"
    }
  });
  console.log('执行了么*********************************',result.data)
  if (result.data.error) {
    return new Error({ code: -1, message: "登录失效" });
  }
  if (result.data.access_token) {
    
    let userInfo = await getInfo(result.data.access_token);
    console.log('userInfo*********************************',userInfo);
    console.log('ctx.session*********************************',ctx.session);
    
    ctx.session.user =  JSON.stringify(userInfo.data);
    console.log('ctx.session.user*********************************',ctx.session.user);

    return new Success({ code: 0, data: userInfo.data });
  }
};

const getInfo = async accessToken => {
  let result = await axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`
    }
  });
  return result;               
};
const getUserInfo = async (ctx) => {

  const result = ctx.session.user;
 
  if(!result){
    return new Error({ code: -1, message: "登录失效" });
  }
  // 查询user 表  有user 跳过，没有创建user
  const user = JSON.parse(result);
  const  value= await User.findOne({
    where:{
      id:user.id
    }
  })
  console.log('value',value);
  if(!value){
    console.info(user);
   const createUser = await User.create({
      id:user.id,
      userName:user.name||user.login,
      password:'123456',
      avatar:user.avatar_url,
    })
    
  }
  return new Success({ code: 0, data: result });
};
module.exports = {
  tokenResponse,
  getUserInfo
};
