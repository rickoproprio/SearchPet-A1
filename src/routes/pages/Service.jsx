import { Helmet } from "react-helmet";
import name from "../../main";

const Service = () => {
  return (
    <>
      <Helmet>
        <title>{name} - Serviço</title>
      </Helmet>
      <main>
        <h1>Serviço</h1>
      </main>
    </>
  );
};

export default Service;
