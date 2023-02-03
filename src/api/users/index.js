import express from "express";
import UsersModel from "./model.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await UsersModel.create(req.body);
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      next(createHttpError(404, `USER WITH ID ${req.params.userId}NOT FOUND`));
    }
  } catch (error) {
    next(error);
  }
});
usersRouter.put("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await UsersModel.destroy({
      where: { id: req.params.userId },
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
