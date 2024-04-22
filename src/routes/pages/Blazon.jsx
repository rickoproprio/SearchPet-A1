import { Helmet } from "react-helmet";
import name from "../../main";

function Blazon() {
  return (
    <>
      <Helmet>
        <title>{name} - Divulgação</title>
      </Helmet>
      <main>
        <h1>Canais de divulgações</h1>
        <p></p>
      </main>
    </>
  );
}

export default Blazon;
