import express from "express";
import "dotenv/config";
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./db/database";
import blog from "./routes/Blog";
import user from "./routes/User";
import admin from "./routes/Admin";
import like from "./routes/Like";
import report from "./routes/Report";

config({ path: "../.env" });

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

dbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/user", user);

app.use("/blog", blog);

app.use("/admin", admin);

app.use("/like", like);

app.use("/report", report);

try {
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
} catch (error) {
  console.log(error.message);
}
