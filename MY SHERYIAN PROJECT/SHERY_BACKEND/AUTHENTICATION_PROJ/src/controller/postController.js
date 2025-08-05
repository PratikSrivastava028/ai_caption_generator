const postModel = require("../models/post.model")
const generateCaption = require("../service/ai.service")

async function createPostController(req, res) {
   const file = req.file;   //file req.file se milegi
   console.log("File received:", file);
    
   const base64Image = Buffer.from(file.buffer).toString("base64");
   const caption = await generateCaption(base64Image)
console.log("Generated caption:", caption);

}

module.exports = {createPostController}