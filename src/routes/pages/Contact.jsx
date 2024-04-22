import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import name from "../../main";

function Concact() {

  const nomes = [
    "João",
    "Maria",
    "José",
    "Pedro",
    "Paulo",
    "Lucas",
    "Luciana",
    "Luiz",
    "Luiza",
    "Luisa",
  ]

  const nomesAleatorios = nomes[Math.floor(Math.random() * nomes.length)];

  return (
    <>
      <Helmet>
        <title>{name} - Contato</title>
      </Helmet>
      <main>
        <h1>Página de contato</h1>
        <p>
          <Link to={`/contact/${nomesAleatorios}`}>Forma de contato 1</Link>
        </p>
      </main>
    </>
  );
}

export default Concact;
