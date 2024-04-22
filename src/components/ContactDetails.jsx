import { useParams, useNavigate } from "react-router-dom";

const ContactDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleContact = () => {
    console.log("Contato Enviado!");
    return navigate("/");
  };

  return (
    <main>
      <h1>
        Exibindo informações do usuario:
        <span style={{ color: "tomato" }}> {id}</span>
      </h1>
      <button onClick={handleContact}>Enviar mensagem</button>
    </main>
  );
};

export default ContactDetails;
