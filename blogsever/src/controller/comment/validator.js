const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2')


class validator extends LinValidator {
  constructor() {
      super()
      this.userId = [
        new Rule('isLength','您尚未登录，请您先登录',{
          min:0,

        }),
        new Rule('isLength','您尚未登录，请您先登录',{
          max:100,
        }),
      ]
    this.blogId = [
      new Rule('isLength','blogId不能为空',{
        min:1,
      })
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
  validator
}