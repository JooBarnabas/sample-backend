import express, { Express, Request, Response, NextFunction } from "express";

function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(`${request.method} ${request.path}`);
  next();
}

const app: Express = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (request: Request, response: Response) => {
  response.send(request.body);
});

app.listen(5000);
