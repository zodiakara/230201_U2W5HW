import { Sequelize } from "sequelize";

const { PG_DB, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT } = process.env;

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: "postgres",
});

export const pgConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to Postgres!");
  } catch (error) {
    console.log(error);
    process.exit(1); // if the operation fails it kills node.js process
  }
};

export const syncModels = async () => {
  await sequelize.sync({ alter: true });
  console.log("All tables successfully synchronized");
};
export default sequelize;

// {alter:true}  updates the tables when model is changed !!
// {force: true} forces the update if regular doesn't work
