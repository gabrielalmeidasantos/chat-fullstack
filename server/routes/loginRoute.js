const express = require("express");
const router = express.Router();
const {
  validaToken,
  cadastrar,
  entrar,
  verificaToken,
  listar,
  user,
} = require("../controllers/loginController");

router.get("/users/:id", verificaToken, listar);
router.get("/user/:id", verificaToken, user);
router.get("/token", validaToken);
router.post("/auth/cadastrar", cadastrar);
router.post("/auth/entrar", entrar);

module.exports = router;
