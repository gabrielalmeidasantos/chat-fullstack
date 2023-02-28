require("dotenv").config();
const app = require("express")();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = 8080;

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "Ta funfando a rota raiz" });
});

app.post("/auth/cadastrar", async (req, res) => {
  const { nome, email, senha } = req.body;
});

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
