import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running");
});

// app.use(globalErrorHandler);
// app.use(notFound);

export default app;
