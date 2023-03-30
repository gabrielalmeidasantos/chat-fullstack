require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const modelUsuario = require("../models/Usuario");

async function validaToken(req, res) {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" "[1]);
  token = token.toString();

  if (!token) {
    res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    res.status(200).json({ msg: "Token valido" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token invalido" });
  }
}

async function verificaToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ msg: "Token invalido" });
  }

  let token = authHeader && authHeader.split(" "[1]);
  token = token.toString();

  if (!token) {
    res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token invalido" });
  }
}

async function listar(req, res) {
  const id = req.params.id;
  let usuarios = await modelUsuario.find(null, "-senha");

  usuarios = usuarios.filter((user) => user._id != id);
  return res.status(200).json(usuarios);
}

async function cadastrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(422).json({ msg: "Preencher o campo nome" });
  }

  if (!email) {
    return res.status(422).json({ msg: "Preencher o campo email" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "Preencher o campo senha" });
  }

  let emailExiste = await modelUsuario.findOne({ email: email });

  let usuarioExiste = await modelUsuario.findOne({ nome: nome });

  if (usuarioExiste || emailExiste) {
    return res.status(422).json({ msg: "Usuario já cadastrado" });
  }

  const salt = await bcrypt.genSalt(12);
  const novaSenha = await bcrypt.hash(senha, salt);

  const usuario = new modelUsuario({
    nome,
    email,
    senha: novaSenha,
  });
  try {
    await usuario.save();
    return res.status(201).json({ msg: "Usuario criado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
}

async function user(req, res) {
  const id = req.params.id;
  let usuario = await modelUsuario.findById(id, "-senha");
  return res.status(200).json(usuario);
}

async function entrar(req, res) {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "Preencher o campo email" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "Preencher o campo senha" });
  }

  const usuarioExiste = await modelUsuario.findOne({ email: email });

  if (!usuarioExiste) {
    return res.status(422).json({ msg: "Usuario nao existe" });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuarioExiste.senha);

  if (!senhaCorreta) {
    return res.status(422).json({ msg: "Senha incorreta" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: usuarioExiste._id,
      },
      secret
    );

    res.status(200).json({ token, _id: usuarioExiste._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
}

module.exports = {
  listar,
  validaToken,
  verificaToken,
  cadastrar,
  entrar,
  user,
};
