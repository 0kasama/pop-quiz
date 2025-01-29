'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM('admin', 'teacher', 'user'),
    },
    {
      sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      modelName: 'users',
      timestamps: true,
    }
  );
  return users;
};
