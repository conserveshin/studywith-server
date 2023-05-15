import express, { Request, Response } from "express";
import { SERVER_ENV } from "./src/config/variables";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello_World!");
});

app.listen(SERVER_ENV.PORT);