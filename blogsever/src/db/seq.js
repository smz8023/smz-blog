const Sequelize = require("sequelize");
const mysqlConfig = require("./mysqlconf");

const seq = new Sequelize(
  mysqlConfig.dbname,
  mysqlConfig.uname,
  mysqlConfig.upwd,
  {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool,
    timezone: '+08:00',
  }
);
seq
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = seq;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('dev', 'root', '123456', {
//   host: 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// })
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('MYSQL 连接成功......');
//   })
//   .catch(err => {
//     console.error('链接失败:', err);
//   });
//   // 根据模型自动创建表
// sequelize.sync()

// module.exports = sequelize
