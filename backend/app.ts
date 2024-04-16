import cors from "cors"
import express, { NextFunction, Request, Response } from "express";

import { parseCode } from "./controller";


const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/runGo", parseCode);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(err.statusCode).json(err.message);
});

app.listen(5050, () => {
  console.log("server running at 5050");
});
