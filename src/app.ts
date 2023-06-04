import express, { NextFunction, Request, Response } from "express";
import { NODE_ENV, SERVER_ENV } from "./config/environment";
import errorHandler from "./middleware/errorHandler";
import { NotFoundError } from "./types/errors";
import loginRouter from "./routes/login";

const app = express();

app.use(express.json());

app.use("/login", loginRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(errorHandler(NODE_ENV !== "production"));

if (NODE_ENV !== "test") {
  app.listen(SERVER_ENV.PORT, () =>{
    console.log(`Server listening on PORT ${SERVER_ENV.PORT}`);
  });
}

export default app;