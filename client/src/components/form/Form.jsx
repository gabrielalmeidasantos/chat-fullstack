import React from "react";

const Form = ({ children, requisicao, ...props }) => {
  return (
    <form onSubmit={requisicao} {...props}>
      {children}
    </form>
  );
};

export default Form;
