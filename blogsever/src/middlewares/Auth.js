const {AuthFailed}  = require('../core/http-exception');
class Auth {
  constructor(){
    
  }
  get m() {
    return async (ctx, next) => {
        
      // 路由白名单
      let errMsg = '您不是管理员，暂无权限'
      const router = ['/api/githubOuth','/api/getUserInfo','/api/upload'];
        if(!router.includes(ctx.path)&&ctx.hostname!=='10.60.19.53'){
          
          // try {
          //   const user = JSON.parse(ctx.session.user);
         
          //   if(user.id!==31838004){
          //     throw await new AuthFailed(errMsg)    
          //   }
          // } catch (error) {
          //   errMsg='您还未登录，请先登录';
          //   throw await new AuthFailed(errMsg)
          // }
        }
      

      // 用户id
      // 邵明振 github id 账号
        let userId = null;
        try {
          userId = JSON.parse(ctx.session.user).id;
        } catch (error) {
          if(process.env.NODE_ENV==='dev'){
            userId = 31838004; // 开发环境
          }else{
            userId = null;
          }
         
        }
        ctx.request.body.userId = userId;
        await next()
    }
  }
}
module.exports=Auth;