let config = {
  dbname: "blob",
  uname: "root",
  upwd: "smz8023XXJ",
  host: "118.190.143.5",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 15,
    min: 0,
    idle: 10000
  }
};

if(process.env.NODE_ENV==='dev'){
  config = {
    dbname: "blog",
    uname: "root",
    upwd: "smz8023xxj",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  }
}

module.exports = config;
