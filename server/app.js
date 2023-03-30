require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;

const io = require("socket.io")(8081, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const cors = require("cors");
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

let users = [];
let conexoes = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const addConex = (id1, id2) => {
  conexoes.push([id1, id2]);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

mongoose
  .connect(
    `mongodb+srv://${db_user}:${db_pass}@chat.f36mdxr.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    io.on("connection", (socket) => {
      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(userId);
      });

      // socket.on("select", () => {
      //   removeUser(socket.id);
      // });

      socket.on("sendMessage", ({ remetente, destinatario, mensagem }) => {
        const user = getUser(destinatario);
        if (user) {
          io.to(user.socketId).emit("getMessage", {
            _id: new Date().getTime(),
            remetente,
            destinatario,
            mensagem,
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("usuario desconectado!");
        removeUser(socket.id);
      });
    });

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
