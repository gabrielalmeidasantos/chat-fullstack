import React from "react";
import styles from "./Mensagem.module.css";

const Mensagem = ({ enviado, mensagem }) => {
  if (enviado) {
    return (
      <div className={styles.enviado}>
        <p> {mensagem}</p>
      </div>
    );
  }

  return (
    <div className={styles.recebido}>
      <p> {mensagem}</p>
    </div>
  );
};

export default Mensagem;
