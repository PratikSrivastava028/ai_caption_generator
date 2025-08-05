const express = require("express")
const userModel = require("../models/user.models")
const authController = require("../controller/auth.controller")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")   
const {registerController,loginController} = require("../controller/auth.controller")

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)

module.exports = router