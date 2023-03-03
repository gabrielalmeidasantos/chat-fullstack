const express = require("express");
const router = express.Router();
const {
  // Listar,
  //   verificaToken,
  cadastrar,
  entrar,
} = require("../controllers/loginController");

// router.get("/usuario/:id", verificaToken, Listar);
router.post("/auth/cadastrar", cadastrar);
router.post("/auth/entrar", entrar);

module.exports = router;
