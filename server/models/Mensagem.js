const mongoose = require("mongoose");

const Mensagem = mongoose.model("mensagem", {
  mensagem: String,
  remetente: String,
  destinatario: String,
  envio: Number,
});

module.exports = Mensagem;
