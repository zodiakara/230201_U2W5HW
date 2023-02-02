import sequelize from "../../db";
import { DataTypes } from "sequelize";

const CategoriesModel = sequelize.define("category", {
  categoryId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CategoriesModel;
