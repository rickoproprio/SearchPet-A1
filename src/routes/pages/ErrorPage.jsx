import name from "../../main";
import "../../style/error.css";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>{name} - Home</title>
      </Helmet>
      <div id="error">
        <h1>404</h1>
        <p id="subtitle">A página que você está procurando não existe.</p>
      </div>
    </>
  );
};

export default ErrorPage;
