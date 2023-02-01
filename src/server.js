import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
server.use(cors());
server.use(express.json());
// ENDPOINTS

//ERROR HANDLERS

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
