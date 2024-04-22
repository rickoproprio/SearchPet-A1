import { Helmet } from "react-helmet";
import name from "../../main";

function User() {
  return (
    <>
      <Helmet>
        <title>{name} - Usuario</title>
      </Helmet>
      <main>
        <h1>Olá seja bem vindo </h1>
      </main>
    </>
  );
}

export default User;
