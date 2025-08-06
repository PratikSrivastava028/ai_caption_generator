const postModel = require("../models/post.model")
const generateCaption = require("../service/ai.service")
const uploadFile = require("../service/storage.service")
const {v4: uuidv4} = require("uuid")

async function createPostController(req, res) {
   const file = req.file;   //file req.file se milegi
   console.log("File received:", file);
    
   const base64Image = Buffer.from(file.buffer).toString("base64");
   const caption = await generateCaption(base64Image)
   const result = await uploadFile(file.buffer , `${uuidv4()}`)    //file.originalName->`${uuidv4()}`      //originalName uuid package se mil jayega jo har file ko unique name provide krta hai

   const post = await postModel.create({
     caption: caption,
     image :result.url,
     user : req.user._id

   })
   res.status(201).json({
   msg :"post created successfully",
   post

   })
}
 


module.exports = {createPostController}