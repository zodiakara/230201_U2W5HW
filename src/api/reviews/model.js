import sequelize from "../../db.js";
import { DataTypes } from "sequelize";
import UsersModel from "../users/model.js";
import ProductsModel from "../products/model.js";

const ReviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 1 to many relationship with users model
// options parameter in 1-1 1-many is optional. in many-many it is REQUIRED

UsersModel.hasMany(ReviewsModel, {
  foreignKey: { allowNull: false },
});
ReviewsModel.belongsTo(UsersModel);

ProductsModel.hasMany(ReviewsModel, {
  foreignKey: { allowNull: false },
});
ReviewsModel.belongsTo(ProductsModel);

export default ReviewsModel;
