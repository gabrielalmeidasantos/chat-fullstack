import React from "react";
import styles from "./Pessoa.module.css";

const Pessoa = ({ nome, selecionarUsuario, id, usuarioAtivo }) => {
  return (
    <div
      className={styles.pessoa}
      onClick={selecionarUsuario}
      id={id}
      style={{
        backgroundColor: usuarioAtivo && "#5b89c5",
        color: usuarioAtivo && "#fff",
      }}
    >
      {nome}
    </div>
  );
};

export default Pessoa;
