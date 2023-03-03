import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Cadastrar from "./pages/cadastrar/Cadastrar";
import Login from "./pages/login/Login";
import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";
import "./App.css";
import Contexto from "./context/Contexto";
import Chat from "./pages/chat/Chat";

function App() {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (tokenLocal) {
      setToken(tokenLocal);
    }
  }, [setToken]);

  return (
    <Contexto.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route
            path="/chat"
            element={token ? <Chat /> : <Navigate to={"/"} />}
          />
          <Route path="/*" element={<NaoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </Contexto.Provider>
  );
}

export default App;
