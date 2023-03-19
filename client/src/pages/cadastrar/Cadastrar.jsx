import React from "react";
import axios from "axios";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import styles from "../login/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import Loading from "../../components/loading/Loading";

const Login = () => {
  const [nome, setnome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [erro, setErro] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [habilitar, seHabilitar] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }, []);

  async function requisicao(event) {
    setLoading(true);
    event.preventDefault();
    seHabilitar(() => false);

    try {
      await axios.post(`${BASE_URL}/api/auth/cadastrar`, {
        nome,
        email,
        senha,
      });

      await axios.post(`${BASE_URL}/api/auth/entrar`, {
        email,
        senha,
      });

      navigate("/");
    } catch (error) {
      setErro(() => error.response.data.msg);
    }

    seHabilitar(() => true);
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
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
