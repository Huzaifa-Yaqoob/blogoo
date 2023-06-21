import express from "express";
import "dotenv/config";
import { config } from "dotenv";
import dbConnect from "./db/database";
import post from "./routes/Post";
import user from "./routes/User";

config({ path: "../.env" });

const app = express();

dbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/post", post);

app.use("/user", user);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
