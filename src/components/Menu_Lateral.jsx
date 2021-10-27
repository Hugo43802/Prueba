import React from "react";
import { Link } from "react-router-dom";

import logo from "media/logo2.png";

const MenuLateral = () => {
  return (
    <div>
      <div className="barra-lateral">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <ul>
          <li>
            <i className="icon-home"></i>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <i className="icon-money"></i>
            <Link to="/Ventas">Ventas</Link>
          </li>
          <li>
            <i className="icon-users"></i>
            <Link to="/Usuarios">Usuarios</Link>
          </li>
          <li>
            <i className="icon-dashboard"></i>
            <Link to="/producto">Administración</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuLateral;
