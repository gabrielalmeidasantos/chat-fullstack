import React from "react";
import styles from "./Pessoa.module.css";

const Pessoa = ({ nome, selecionarUsuario, id }) => {
  return (
    <div className={styles.pessoa} onClick={selecionarUsuario} id={id}>
      {nome}
    </div>
  );
};

export default Pessoa;
