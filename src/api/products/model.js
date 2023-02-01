import sequelize from "../../db.js";
import { DataTypes } from "sequelize"; // defines all kinds of datatypes available

const ProductsModel = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true, // cannot pass null to primary key so pk checks it, no need to add allowNull
    defaultValue: DataTypes.UUIDV4, // checks that pg creates new id every time an item is added to a table!!
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default ProductsModel;
