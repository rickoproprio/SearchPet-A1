import { Helmet } from "react-helmet";
import name from "../../main";

function Home() {
  return (
    <main>
      <Helmet>
        <title>{name} - Home</title>
      </Helmet> 
      <h1>Search Pet</h1>
      <p>Encontre seu Pet ou colabore a encontrar outros pets. </p>
    </main>
  );
}

export default Home;
