const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected :D");
  socket.on("addUser", (userID) => {
    addUser(userID, socket.id);
    io.emit("getUser", users);
  });
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user === undefined) {
      return;
    }
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const userRouter = require("./routes/users");
const authRouter = require("./routes/auths");
const postRouter = require("./routes/post");
const savePostRouter = require("./routes/savepost");
const reportRouter = require("./routes/report");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const mailRouter = require("./routes/mail");
const categoryRouter = require("./routes/category");

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("connect db success");
});

//midleware
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/savepost", savePostRouter);
app.use("/api/report", reportRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/email", mailRouter);
app.use("/api/category", categoryRouter);

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Sever Running at ${PORT}`);
});
