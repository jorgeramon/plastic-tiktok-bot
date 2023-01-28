const { DataTypes } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.ENUM,
    values: ["LIVE"],
  },
  field: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
