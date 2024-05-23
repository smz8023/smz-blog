const seq = require('../seq');
const Sequelize = require('sequelize');
const Comment = seq.define('comment',{
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  blogId:{
    type:Sequelize.STRING,
    allowNull:false
  },
  content:{
    type:Sequelize.STRING,
  }
});
module.exports = Comment;