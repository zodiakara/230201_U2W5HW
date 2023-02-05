import express from "express";
import ProductsModel from "./model.js";
import { Op } from "sequelize";
import createHttpError from "http-errors";

const productRouter = express.Router();

productRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await ProductsModel.create(req.body);
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

//get products should also display categories and reviews info!!
productRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    // filter by name
    //if (req.query.name) query.name = { [Op.iLike]: `%${req.query.name}%` };
    // filter by PRICE RANGE
    //if (req.query.price) query.price = { [Op.gte]: `${req.query.price}` };
    // filter by CATEGORY
    if (req.query.category)
      query.category = { [Op.eq]: `${req.query.category}` };
    const products = await ProductsModel.findAll({
      where: { ...query },
      attributes: ["name", "category", "price", "id"],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByPk(req.params.productId, {
      attributes: { exclude: ["createdAt"] },
    });
    if (product) {
      res.send(product);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId}not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
productRouter.put("/:productId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ProductsModel.update(
      req.body,
      {
        where: { id: req.params.productId },
        returning: true,
      }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId}not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ProductsModel.destroy({
      where: { id: req.params.productId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId}not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productRouter;
