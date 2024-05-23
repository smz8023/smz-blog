const seq = require('../seq');
const { Sequelize, Model, } = require('sequelize');
class Blog extends Model {};
Blog.init({
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  htmlContent:{
    type:Sequelize.TEXT,
    allowNull:true
  },  
  content:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:true
  },
  commentId:{
    type:Sequelize.INTEGER,
    allowNull:true
  },
  type:{
    type:Sequelize.STRING,
  }
},{
  sequelize:seq,// sequelize的实例
  // tableName: 'user'// 指定表明
});
module.exports = Blog;