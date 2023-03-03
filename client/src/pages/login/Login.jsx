import React, { useContext } from "react";
import axios from "axios";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import Contexto from "../../context/Contexto";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [habilitar, seHabilitar] = React.useState(true);
  const { setToken } = useContext(Contexto);
  const navigate = useNavigate();

  React.useEffect(() => {
    let tokenLocal = localStorage.getItem("token");
    if (tokenLocal) {
      setToken(tokenLocal);
      console.log("oui");
      setTimeout(() => {
        navigate("/chat");
      }, 1500);
    }
  }, [setToken, navigate]);

  async function requisicao(event) {
    event.preventDefault();
    seHabilitar(() => false);
    let retorno;

    try {
      retorno = await axios.post(`${BASE_URL}/api/auth/entrar`, {
        email,
        senha,
      });

      setToken(retorno.data.token);
      localStorage.setItem("token", retorno.data.token);

      navigate("/chat");

      setErro("");
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
        <h1>Entrar</h1>
        <Form requisicao={requisicao}>
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
            value={"Entrar"}
            disabled={!habilitar}
            style={{
              backgroundColor: "#1877f2",
              color: "#fff",
              opacity: habilitar ? 1 : 0.8,
              cursor: habilitar ? "pointer" : "not-allowed",
            }}
          />
          <Link
            to={"cadastrar"}
            className={styles.criarConta}
            style={{
              opacity: habilitar ? 1 : 0.8,
              cursor: habilitar ? "pointer" : "not-allowed",
            }}
          >
            Criar nova conta
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
