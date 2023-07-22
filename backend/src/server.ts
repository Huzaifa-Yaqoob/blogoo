import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
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

export const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/user", user);

app.use("/blog", blog);

app.use("/admin", admin);

app.use("/like", like);

app.use("/report", report);

app.get("*", (req, res) => {
  res.send(400).send({notFound: true});
})

try {
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
} catch (error) {
  console.log(error.message);
}
