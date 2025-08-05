const express = require("express")
const authroutes = require("./routers/auth.routes")
const postroutes = require("./routers/post.routes")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) 
app.use(cookieParser())
app.use("/api/auth", authroutes) 
app.use("/api/posts",postroutes)

module.exports = app