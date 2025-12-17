import express from "express";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";

import { prismaClient } from "@repo/db/client";
const app = express();

// username, password, email
app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      message: "Incorrect Input",
    });
  }

  try {
    await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.username,
      },
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists...",
    });
  }

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
