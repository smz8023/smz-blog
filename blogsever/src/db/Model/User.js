const seq = require('../seq');
const Sequelize = require('sequelize');
const User = seq.define('user',{
  userName:{
    type:Sequelize.STRING,
    allowNull:false
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false
  },
  nickName:{
    type:Sequelize.STRING,
  },
  avatar:{
    type:Sequelize.STRING,
  }
});
module.exports = User;