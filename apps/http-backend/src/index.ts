import express from "express";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";

const app = express();

app.post("/signup", (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Input",
    });
  }
  const username = req.body.username;
  const password = req.body.password;

  // user.findOne({username, password})
  // if found user... user already exist...
  // if not found...
  // userModel.create({usernam, password}) also encrypt the password using bcrypt library
});

app.post("/signin", (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs",
    });
  }
  const username = req.body.username;
  const password = req.body.password;
  const userId = 1;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    token: token,
  });
});

app.post("/room", middleware, (req, res) => {
  // db call
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Input",
    });
  }

  res.json({
    roomId: 123,
  });
});

app.listen(2000, () => {
  console.log("Your app is running on port 2000");
});
