import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import quizRoutes from "./routes/quizRoutes";
import { connectDatabase } from "./database";
import dotenv from "dotenv";
import cors from "cors";
const setupSwagger = require("./swagger");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/auth", authRoutes);
app.use("/quizzes", quizRoutes);

setupSwagger(app);

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
