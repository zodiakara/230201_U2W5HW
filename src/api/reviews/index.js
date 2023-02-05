import express from "express";
import createHttpError from "http-errors";
import UsersModel from "../users/model.js";
import ReviewsModel from "./model.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:userId/reviews", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId);
    if (user) {
      const { reviewId } = await ReviewsModel.create(req.body);
      res.status(201).send({ id: reviewId });
    } else {
      next(createHttpError(404, `USER WITH ID ${req.params.userId}NOT FOUND`));
    }
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:userId/reviews", async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.findAll({
      include: [{ model: UsersModel, attributes: ["name", "surname"] }],
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
