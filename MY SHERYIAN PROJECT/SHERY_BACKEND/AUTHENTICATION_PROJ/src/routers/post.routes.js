const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/auth.middleware")
const multer = require("multer")
const { createPostController } = require("../controller/postController")

const upload = multer({storage: multer.memoryStorage()})


router.post("/",authmiddleware,
    upload.single("image"),
    createPostController )



module.exports = router