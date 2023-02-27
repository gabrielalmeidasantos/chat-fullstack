import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastrar from "./pages/cadastrar/Cadastrar";
import Login from "./pages/login/Login";
import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/*" element={<NaoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
