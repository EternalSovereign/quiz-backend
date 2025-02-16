import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
export const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL, {
          dialect: "postgres",
          logging: false,
      })
    : new Sequelize(
          process.env.DB_NAME as string,
          process.env.DB_USER as string,
          process.env.DB_PASSWORD as string,
          {
              host: process.env.DB_HOST as string,
              dialect: "postgres",
              logging: false,
          }
      );

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
