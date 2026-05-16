import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

//data format middleware or body parser
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "ecpress server",
    author: "Next Level",
  });
});

//atached router
app.use("/api/users", userRoute);


export default app;
