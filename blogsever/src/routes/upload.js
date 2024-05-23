const mkdirp = require('mkdirp');
const uuid = require('node-uuid');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const router = require("koa-router")();
router.prefix("/api"); //路由前缀
// 上传文件

router.post("/upload", async (ctx, next) => {
  const result = await uploadFile(ctx);
  console.log(result);
  ctx.body = {"code": 200, "description": "SUCCESS",result};
});
// 通过 Promise 封装一个同步上传图片的方法，只有在图片上传完，或者上传报错了才会有返回值
// 既然是Promise封装的，当然可以使用 async/await 来同步执行它了
// 我在开发上传功能的时候碰到一个需求，上传图片完成后计算一下图片的md5，目的是对图片去重，结果nodejs里的IO流里完成后的处理要在 finish 事件里处理
// 但项目又是用的koa，路由里还用了async/await，直接把ctx.body写在finish事件里运行还报错
// 然后上网查资料，群里跟大伙讨论后找到了解决办法，就是通过Promise封装一个上传方法来解决，代码就是下面这些
// 趟了这个坑，后面再碰到要等逻辑执行完才能处理的任务，就可以套用了，爽歪歪
function uploadFile(ctx) {
  console.log("开始上传图片。。。");
  const filename = ctx.request.files.file.name || uuid.v4();
  const file = ctx.request.files.file;
  const basename = path.basename(file.path);
  const ext = file.name.split('.').pop();      // 获取上传文件扩展名
  const uploadPath = path.resolve(__dirname,'../public/images')
  // 文件全路径
  const filePath = `${uploadPath}/${filename}`;
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(file.path);
    const upStream = fs.createWriteStream(filePath); // 创建可写流
    // 对写入流进行事件监听
    // upStream.on('open', function () {
    //   console.log("open");
    // });
    // 流写入成功后调用的事件，在这里处理返回结果
    upStream.on('finish', function () {
      console.log("finish");
      // 对图片计算md5值的，你也可以处理自己的逻辑，然后通过 resolve() 函数将处理的结果返回即可
      const buf = fs.readFileSync(filePath);
      const hash = md5(buf);
      
      resolve({
        // md5: hash,
        // url:`${ctx.origin}/public/images/${basename}.${ext}`
        url:`${ctx.origin}/public/images/${filename}`

      });
    });
    // upStream.on('close', function () {
    //   console.log("close");
    // });
    upStream.on('error', function (err) {
      // 有错误的话，在这个里面处理
      console.log("error", err);
      reject(err)
    });
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  });
}

module.exports = router;