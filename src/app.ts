import express, { Request, Response } from "express";
import { NODE_ENV, SERVER_ENV } from "./config/variables";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello_World!");
});

if (NODE_ENV !== "test") {
  app.listen(SERVER_ENV.PORT, () =>{
    console.log(`Server listening on PORT ${SERVER_ENV.PORT}`)
  });
}

export default app;