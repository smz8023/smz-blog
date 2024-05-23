const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2')


class PostReleaseValidator extends LinValidator {
  constructor() {
      super()
      this.title = [
            new Rule('isLength','标题不能为空',{
              min:0,

            }),
            new Rule('isLength','标题长度不能超过10个字符',{
              max:10,

            }),
          ]
      this.userId = [
        new Rule('isLength','您尚未登录，请您先登录',{
          min:0,

        }),
        new Rule('isLength','您尚未登录，请您先登录',{
          max:100,
        }),
      ]
      this.type = [
        new Rule('isInt','类型参数不正确'),
        ]
    this.content = [
      new Rule('isLength','内容不能为空',{
        min:1,

      }),
      new Rule('isLength','内推长度不能超过1000个字符',{
        max:1000,

      }),
      ]
  }
}
module.exports={
  PostReleaseValidator
}