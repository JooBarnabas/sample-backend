import express, { Request, Response, NextFunction } from "express";
import IController from "./interfaces/controller.interface";
import { config } from "dotenv";
import mongoose from "mongoose";

export default class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    config();
    this.app = express();
    this.connectToDatabase(controllers);
  }

  private loggerMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(this.loggerMiddleware);
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public connectToDatabase(controllers: IController[]) {
    const { MONGO_URI, MONGO_DB, PORT } = process.env;
    mongoose.connect(MONGO_URI as string, { dbName: MONGO_DB});

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB server.");
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
      this.app.listen(PORT, () => {
        console.log(`App listening on the port ${PORT}`);
      });
    });
    mongoose.connection.on("error", error => {
      console.log(`Mongoose error: ${error.message}`)
    });
  }
}
