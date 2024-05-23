const seq = require('./seq')
const User = require('./Model/User');
const Blog = require('./Model/Blog');
const Comment = require('./Model/comment')
seq.sync({
  alter: true // 新增字段会自动增加 模型新增字段会自动在数据库中添加
});// blog 属于user 多对一,通过博客 查出user
Blog.belongsTo(User,{
  // 创建外键 Blog.userId -> User.id
  foreignKey:'userId'
})

// 根据blog列表查询留言、评论
Blog.belongsTo(Comment,{
  // 创建外键 Blog.userId -> User.id
  foreignKey:'commentId'
})

// 通过Comment中的userId查询用户
Comment.belongsTo(User,{
  foreignKey:'userId'
})
// 一对多  一个用户多个博客，根据user 查出博客
User.hasMany(Blog,{
  foreignKey:'userId'
})

// 一对多  一个用户多个评论
// User.hasMany(Comment,{
//   foreignKey:'userId'
// })
module.exports = {Blog,User,Comment};
