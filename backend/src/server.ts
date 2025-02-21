import express from "express";
import * as dotenv from "dotenv";
import "./db/db";
import routes from "./routes";
dotenv.config();
const app = express();

const environment = process.env.ENVIRONMENT;
const PORT = environment === "production" ? 8080 : 3000;

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from Express Server" });
});
app.listen(PORT);
