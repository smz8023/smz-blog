const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const redisConfig = require('./db/redisconf')
// 静态文件
const static = require("koa-static");
// redis 链接
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
// 上传
const koaBody = require('koa-body');
const index = require("./routes/index");
const users = require("./routes/users");
const login = require("./routes/login");
const release = require('./routes/release');
const heat = require("./routes/Reptile/heat");
const upload = require('./routes/upload');
// 留言接口
const comment = require('./routes/comment')
// 获取博客列表
const blogList = require('./routes/blogList');
// 全局错误厝里
const catchError = require('./middlewares/exception');
const {set,get} = require('./catch/redis');


// 权限控制
const Auth = require('./middlewares/Auth');
require('./db/index');
const config = {
  environment:'dev'
}
// 全局配置文件
global.config = config;
// error handler
onerror(app);

// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"]
//   })
// );
// 上传中间件
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024,   // 设置上传文件大小最大限制，默认2M
    onFileBegin:(name,file)=>{
      console.log("name",name);
      console.log("file",file);
    }
  }
}));
// redis 中间件
app.keys = ['SD123ui_sd$@'];
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 单位 ms
  },
  ttl:24 * 60 * 60 * 1000,
  store:new redisStore({
    host: redisConfig.host,
    port: redisConfig.port,
    password:'smz8023XXJ'
  }),
  errorHandler:(err)=>{
    console.log('redis err',err)
  }
}))
app.use(catchError);
app.use(json());
app.use(logger());

app.use(static(__dirname,  '/public'));
app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 权限
app.use(new Auth().m)

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(heat.routes(), heat.allowedMethods()); 
app.use(release.routes(), release.allowedMethods())
app.use(upload.routes(),upload.allowedMethods())
app.use(blogList.routes(),blogList.allowedMethods())
app.use(comment.routes(),comment.allowedMethods())
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
