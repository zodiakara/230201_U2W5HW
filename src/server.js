import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productRouter from "./api/products/index.js";
import { pgConnect, syncModels } from "./db.js";
import {
  badRequestErrorHandler,
  forbiddenErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers.js";

const server = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
server.use(cors());
server.use(express.json());

// ENDPOINTS
server.use("/products", productRouter);

//ERROR HANDLERS
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(genericErrorHandler);

// pg database:
await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
