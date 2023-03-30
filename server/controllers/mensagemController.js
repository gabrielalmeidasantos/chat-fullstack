const Mensagem = require("../models/Mensagem");

async function adicionarMensagem(req, res) {
  const envio = new Date().getTime();
  const { mensagem, remetente, destinatario } = req.body;

  const novaMensagem = new Mensagem({
    mensagem,
    remetente,
    destinatario,
    envio,
  });

  try {
    const mensagemSalva = await novaMensagem.save();
    res.status(200).json(mensagemSalva);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function listarMensagem(req, res) {
  const { remetente, destinatario } = req.params;

  try {
    const enviadas = await Mensagem.find({ remetente, destinatario });
    const recebidas = await Mensagem.find({
      remetente: destinatario,
      destinatario: remetente,
    });

    let mensagens = [...enviadas, ...recebidas];
    mensagens = mensagens.sort();

    res.status(200).json(mensagens);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  adicionarMensagem,
  listarMensagem,
};
