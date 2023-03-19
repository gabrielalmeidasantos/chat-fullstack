require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const loginRouter = require("./routes/loginRoute");
const chatRouter = require("./routes/MensagemRoute");

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/", loginRouter);
app.use("/api/chat", chatRouter);

mongoose
  .connect(
    `mongodb+srv://${db_user}:${db_pass}@chat.f36mdxr.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
