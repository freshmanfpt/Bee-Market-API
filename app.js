const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/users");
const authRouter = require("./routes/auths");
const postRouter = require("./routes/post");
const savePostRouter = require("./routes/savepost");
const reportRouter = require("./routes/report");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const mailRouter = require("./routes/mail");
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
app.use("/api/email",mailRouter); 
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sever Running at ${PORT}`);
});
