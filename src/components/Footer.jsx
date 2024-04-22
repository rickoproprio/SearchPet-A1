import { Link } from "react-router-dom";
import "../style/footer.css";

const Footer = () => {
  const Year = new Date().getFullYear();

  return (
    <footer>
      <p>
        ₢ {Year} <Link to="/">Fsystem Private</Link> - Todos os direitos
      </p>
    </footer>
  );
};

export default Footer;
