import sequelize from "../../db";
import { DataTypes } from "sequelize";
import UsersModel from "../users/model.js";

const ReviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 1 to many relationship with users model
// options parameter in 1-1 1-many is optional. in many-many it is REQUIRED

UsersModel.hasMany(ReviewsModel, {
  foreignKey: { name: reviewId, allowNull: false },
});
ReviewsModel.belongsTo(UsersModel);

export default ReviewsModel;
