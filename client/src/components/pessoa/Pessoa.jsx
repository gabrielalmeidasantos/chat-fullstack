import React from "react";
import styles from "./Pessoa.module.css";

const Pessoa = ({ nome, selecionarUsuario, id, usuarioAtivo }) => {
  return (
    <div
      className={styles.pessoa}
      onClick={selecionarUsuario}
      id={id}
      style={{
        backgroundColor: usuarioAtivo && "#d6d6d6",
        color: usuarioAtivo && "#000",
      }}
    >
      {nome}
    </div>
  );
};

export default Pessoa;
