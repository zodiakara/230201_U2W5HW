import sequelize from "../../db";
import { DataTypes } from "sequelize";

const UsersModel = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default UsersModel;
