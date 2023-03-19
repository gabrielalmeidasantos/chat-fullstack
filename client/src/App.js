import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Cadastrar from "./pages/cadastrar/Cadastrar";
import Login from "./pages/login/Login";
import "./App.css";
import Contexto from "./context/Contexto";
import Chat from "./pages/chat/Chat";

function App() {
  const [token, setToken] = React.useState(null);
  const [idUser, setIdUser] = React.useState(null);

  React.useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    const idLocal = localStorage.getItem("id");
    if (tokenLocal) {
      setToken(tokenLocal);
    }

    if (idLocal) {
      setIdUser(idLocal);
    }
  }, [setToken, setIdUser]);

  return (
    <Contexto.Provider value={{ token, setToken, idUser, setIdUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Contexto.Provider>
  );
}

export default App;
