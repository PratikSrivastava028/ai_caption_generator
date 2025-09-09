const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateResponse } = require('./src/service/ai.service');
require('dotenv').config();

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
socket.on("ai-msg",async(data) =>{
  const response = await generateResponse(data);
  console.log("AI msg received",response);

  socket.emit("ai-msg-response",response);
})
});

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});

