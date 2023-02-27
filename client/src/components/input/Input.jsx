import React from "react";

const Input = ({ tipo, value, setValue, ...props }) => {
  return (
    <input
      type={tipo}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      required
      {...props}
    />
  );
};

export default Input;
