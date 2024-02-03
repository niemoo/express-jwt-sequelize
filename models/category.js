'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Category name is already exists',
        },
        validate: {
          notNull: {
            msg: "Category name can't be null",
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      hooks: {
        afterValidate: (category, options) => {
          category.name = category.name.toLowerCase();
        },
      },
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
