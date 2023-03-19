const express = require("express");
const router = express.Router();
const { verificaToken } = require("../controllers/loginController");
const {
  adicionarMensagem,
  listarMensagem,
} = require("../controllers/mensagemController");

router.post("/add", verificaToken, adicionarMensagem);
router.get("/listar/:remetente/:destinatario", verificaToken, listarMensagem);

module.exports = router;
