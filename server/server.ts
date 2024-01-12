import Pusher from "pusher";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv, { parse } from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster:process.env.cluster,
  useTLS: true,
});

app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  res.send(payload);
});

app.listen( process.env.port,() =>
  console.log(`Listening at ${process.env.port}`)
);
