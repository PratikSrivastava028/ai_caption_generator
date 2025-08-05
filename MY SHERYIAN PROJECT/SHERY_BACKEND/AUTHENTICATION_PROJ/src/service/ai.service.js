require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);



async function generateCaption(base64ImageFile){

const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({  //response send to AI model 
  model: "gemini-2.5-flash",
  contents: contents,
  config:{
    systemInstruction:`generate captions are maximum of 2 lines.

    also use emojis in caption.`
  }
});
return response.text;
}


module.exports = generateCaption;