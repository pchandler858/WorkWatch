const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);


module.exports = connection;
