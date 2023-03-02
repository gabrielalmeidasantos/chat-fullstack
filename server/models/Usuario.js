const mongoose = require("mongoose");

const Usuario = mongoose.model("usuario", {
  nome: String,
  email: String,
  senha: String,
});

module.exports = Usuario;
