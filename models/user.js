'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
      role_id: {
        type: DataTypes.UUID,
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }

          if (!user.role_id) {
            const userRole = await sequelize.models.Role.findOne({ where: { name: 'user' } });
            user.role_id = userRole.id;
          }
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  User.prototype.CorrectPassword = async (reqPassword, passwordDB) => {
    return await bcrypt.compareSync(reqPassword, passwordDB);
  };
  return User;
};