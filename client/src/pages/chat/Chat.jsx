import React, { useContext } from "react";
import Pessoa from "../../components/pessoa/Pessoa";
import styles from "./Chat.module.css";
import Contexto from "../../context/Contexto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import Mensagem from "../../components/mensagem/Mensagem";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Form from "../../components/form/Form";

const Chat = () => {
  const [mensagem, setMensagem] = React.useState("");
  const [usuarios, setUsuarios] = React.useState([]);
  const [usuario, setUsuario] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [mensagens, setMensagens] = React.useState(false);
  const [destinatario, setDestinatario] = React.useState();
  const [dadosDestinatario, setDadosDestinatario] = React.useState(null);
  const { setToken } = useContext(Contexto);
  const containerChat = React.useRef(null);
  const navigate = useNavigate();

  function atualizarMensagens(idLocal, idDestinatario, token) {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/chat/listar/${idLocal}/${idDestinatario}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setMensagens(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    if (containerChat.current) {
      containerChat.current.scrollTop = containerChat.current.scrollHeight;
    }
    setLoading(false);
  }

  function selecionarUsuario(event) {
    setMensagens(() => "");
    setDestinatario({ ...destinatario, id: event.target.id });
    setMensagem(() => "");
    const idLocal = localStorage.getItem("id");
    const tokenLocal = localStorage.getItem("token");

    atualizarMensagens(idLocal, event.target.id, tokenLocal);
  }

  async function enviarMensagem(e) {
    e.preventDefault();
    const tokenLocal = localStorage.getItem("token");
    const idLocal = localStorage.getItem("id");

    if (!mensagem || mensagem.length === 0) {
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${BASE_URL}/api/chat/add`,
        {
          mensagem,
          remetente: idLocal,
          destinatario: destinatario.id,
        },
        {
          headers: {
            Authorization: `${tokenLocal}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data.msg);
    }

    atualizarMensagens(idLocal, destinatario.id, tokenLocal);

    setMensagem(() => "");
    setLoading(false);
  }

  React.useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    const idLocal = localStorage.getItem("id");
    if (tokenLocal) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/token`, {
          headers: {
            Authorization: `${tokenLocal}`,
          },
        })
        .catch((err) => {
          localStorage.removeItem("token");
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
      setToken(tokenLocal);

      axios
        .get(`${BASE_URL}/api/user/${idLocal}`, {
          headers: {
            Authorization: `${tokenLocal}`,
          },
        })
        .then((response) => {
          setUsuario(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });

      axios
        .get(`${BASE_URL}/api/users/${idLocal}`, {
          headers: {
            Authorization: `${tokenLocal}`,
          },
        })
        .then((response) => {
          setUsuarios(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [setToken, navigate]);

  React.useEffect(() => {
    if (destinatario) {
      setLoading(true);
      const tokenLocal = localStorage.getItem("token");
      axios
        .get(`${BASE_URL}/api/user/${destinatario.id}`, {
          headers: {
            Authorization: `${tokenLocal}`,
          },
        })
        .then((response) => {
          setDadosDestinatario(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [destinatario]);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}></header>
      <header className={styles.falso_header}></header>
      <main className={styles.main}>
        <div className={styles.esquerda}>
          <div className={styles.perfil}>{usuario.nome}</div>
          <div className={styles.pessoas}>
            {usuarios.map((user) => (
              <Pessoa
                key={user._id}
                nome={user.nome}
                id={user._id}
                selecionarUsuario={selecionarUsuario}
                usuarioAtivo={user._id === destinatario?.id}
              />
            ))}
          </div>
          <p className={styles.sair} onClick={sair}>
            Encerrar sessão
          </p>
        </div>
        <div className={styles.direita}>
          {!destinatario && !dadosDestinatario && (
            <div className={styles.selecione_conversa}>
              Nenhuma conversa selecionada
            </div>
          )}
          {destinatario && dadosDestinatario && (
            <>
              <p>{dadosDestinatario.nome}</p>
              <div className={styles.conversas} ref={containerChat}>
                <div>
                  {mensagens &&
                    mensagens?.map((msg) => (
                      <Mensagem
                        enviado={msg.remetente !== localStorage.getItem("id")}
                        mensagem={msg.mensagem}
                        key={msg._id}
                      />
                    ))}
                </div>
              </div>
              <Form className={styles.mensagem} requisicao={enviarMensagem}>
                <div>
                  <Input
                    type={"text"}
                    value={mensagem}
                    setValue={setMensagem}
                    placeholder="Digite sua mensagem..."
                    className={styles.inputEnviar}
                    required={true}
                  />
                  <input
                    onClick={enviarMensagem}
                    type="submit"
                    placeholder="Enviar"
                    className={styles.enviar}
                  />
                </div>
              </Form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
