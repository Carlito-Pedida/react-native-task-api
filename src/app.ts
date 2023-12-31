import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { db } from "./models";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:8100"]
};
app.use(cors(corsOptions));
// routes

app.use("/api/tasks", taskRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
  console.info("connected to the database!");
});

app.listen(3000);
