import React from "react";
// import styles from "./Form.module.css";

const Form = ({ children, requisicao }) => {
  return <form onSubmit={requisicao}>{children}</form>;
};

export default Form;
