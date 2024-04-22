import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBars,
  faGlobe,
  faGear,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../style/menu.css";

function Navbar() {
  const [, setMenuItems] = useState([]);

  // Selecionar os itens clicados
  function selectionLinks(e) {
    const item = e.target.parentElement;
    if (item.classList.contains("ativo")) return;
    if (item.classList.contains("svg-inline--fa")) {
      const itemSVG = item.parentElement.parentElement.parentElement;
      const items = document.querySelectorAll(".item-menu");
      items.forEach((item) => item.classList.remove("ativo"));
      itemSVG.classList.add("ativo");
      return setMenuItems(itemSVG);
    }
    if (item.classList.contains("text")) {
      const itemText = item.parentElement.parentElement;
      const items = document.querySelectorAll(".item-menu");
      items.forEach((item) => item.classList.remove("ativo"));
      itemText.classList.add("ativo");
      return setMenuItems(itemText);
    }
    const items = document.querySelectorAll(".item-menu");
    items.forEach((item) => item.classList.remove("ativo"));
    item.classList.add("ativo");

    return setMenuItems(item);
  }

  window.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".item-menu");
    items.forEach((item) => item.classList.remove("ativo"));
  });

  // Expandir Menu
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    const main = document.querySelector("main");
    if (expanded) {
      main.style.marginLeft = "95px";
    } else {
      main.style.marginLeft = "300px";
    }
    setExpanded(!expanded);
  }

  return (
    <nav className={`sidemenu ${expanded ? "expand" : ""}`}>
      <div className="btn-expand" onClick={toggleExpand}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li className="item-menu ativo">
          <Link to="/" onClick={selectionLinks}>
            <span className="icon">
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <span className="text">
              <p>Home</p>
            </span>
          </Link>
        </li>
        <li className="item-menu">
          <Link to="Blazon" onClick={selectionLinks}>
            <span className="icon">
              <FontAwesomeIcon icon={faGlobe} />
            </span>
            <span className="text">
              <p>Divulgação</p>
            </span>
          </Link>
        </li>
        <li className="item-menu">
          <Link to="service" onClick={selectionLinks}>
            <span className="icon">
              <FontAwesomeIcon icon={faGear} />
            </span>
            <span className="text">
              <p>Serviço</p>
            </span>
          </Link>
        </li>
        <li className="item-menu">
          <Link to="contact" onClick={selectionLinks}>
            <span className="icon">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <span className="text">
              <p>Contato</p>
            </span>
          </Link>
        </li>
        <li className="item-menu">
          <Link to="user" onClick={selectionLinks}>
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="text">
              <p>Conta</p>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
