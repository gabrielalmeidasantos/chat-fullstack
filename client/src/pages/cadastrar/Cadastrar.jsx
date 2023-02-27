import React from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import styles from "../login/Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  function requisicao(event) {
    event.preventDefault();
    console.log("oi");
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.backgroundEsquerda}></div>
      <div className={styles.formDireita}>
        <h1>Cadastrar</h1>
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
            value={"Cadastrar"}
            style={{ backgroundColor: "#1877f2", color: "#fff" }}
          />
          <Link to={"/"} className={styles.criarConta}>
            Ja possui uma conta?
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
