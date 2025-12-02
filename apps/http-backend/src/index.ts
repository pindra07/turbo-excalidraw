import express from "express"
import * as z from "zod"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { middleware } from "./middleware"


const app = express()

const signupSchema = z.object({
    username: z.string(),
    password: z.string()
})

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // user.findOne({username, password})
    // if found user... user already exist...
    // if not found...
    // userModel.create({usernam, password}) also encrypt the password using bcrypt library

})

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userId = 1

    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        token: token
    })
})

app.post("/room", middleware , (req, res) => {
    // db call


    res.json({
        roomId: 123
    })
})

app.listen(2000, () => {
    console.log("Your app is running on port 2000");
})

