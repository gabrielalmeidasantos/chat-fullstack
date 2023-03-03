import React, { useContext } from "react";
import axios from "axios";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import styles from "../login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Contexto from "../../context/Contexto";
import { BASE_URL } from "../../config";

const Login = () => {
  const [nome, setnome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [habilitar, seHabilitar] = React.useState(true);
  const { setToken } = useContext(Contexto);
  const navigate = useNavigate();

  async function requisicao(event) {
    event.preventDefault();
    seHabilitar(() => false);
    let retorno;

    try {
      retorno = await axios.post(`${BASE_URL}/api/auth/cadastrar`, {
        nome,
        email,
        senha,
      });

      retorno = await axios.post(`${BASE_URL}/api/auth/entrar`, {
        email,
        senha,
      });

      setToken(retorno.data.token);
      localStorage.setItem("token", retorno.data.token);
      navigate("/chat");
    } catch (error) {
      setErro(() => error.response.data.msg);
    }

    seHabilitar(() => true);
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.backgroundEsquerda}></div>
      <div className={styles.formDireita}>
        <p className={styles.erro}>{erro}</p>
        <h1>Cadastrar</h1>
        <Form requisicao={requisicao}>
          <Input
            type={"text"}
            value={nome}
            setValue={setnome}
            placeholder="Nome"
          />

          <Input
            type={"email"}
            value={email}
            setValue={setEmail}
            placeholder="Email"
          />

          <Input
            type={"password"}
            value={senha}
            setValue={setSenha}
            placeholder="Senha"
          />

          <Input
            type={"submit"}
            value={"Cadastrar"}
            style={{
              backgroundColor: "#1877f2",
              color: "#fff",
              opacity: habilitar ? 1 : 0.8,
              cursor: habilitar ? "pointer" : "not-allowed",
            }}
          />
          <Link
            to={"/"}
            className={styles.criarConta}
            style={{
              opacity: habilitar ? 1 : 0.8,
              cursor: habilitar ? "pointer" : "not-allowed",
            }}
          >
            Ja possui uma conta?
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
