import { Helmet } from "react-helmet";
import name from "../../main";

function Home() {
  return (
    <main>
      <Helmet>
        <title>{name} - Home</title>
      </Helmet> 
      <h1>Neo Pet</h1>
      <p>teste teste </p>
    </main>
  );
}

export default Home;
