const { Sequelize } = require("sequelize");
const configTable = require("./config");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

exports.ConfigModel = sequelize.define("Config", configTable, {
  tableName: "configurations",
});

exports.connect = async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error(e);
  }
};
