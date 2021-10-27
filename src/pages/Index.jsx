import { render } from "@testing-library/react";
import Logo from "media/logo2.png";
import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Index() {
  let history = useHistory();
  const responseGoogle = (response) => {
    console.log(response.profileObj.email);
    history.push("/Usuarios");
  };
  return (
    <div className="Index">
      <body>
        <div className="principal">
          <div className="navegacion">
            <div className="menu">
              <ul className="items">
                <li className="li-menu">Inicio</li>
                <li className="li-menu">Sobre Nosotros</li>
                <li className="li-menu">Ir a la tienda</li>
                <li className="li-menu">Contáctenos</li>
              </ul>
              <ul className="item-boton">
                <li className="li-button">
                  <GoogleLogin
                    clientId="808256838062-lrn2slb1qcc4f33h08aqmbk0gol7bsi9.apps.googleusercontent.com"
                    buttonText="Iniciar Sesión"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={(renderprops) => (
                      <button
                        className="btn_init_sesion"
                        onClick={renderprops.onClick}
                        disabled={renderprops.disabled}
                      >
                        Iniciar Sesión con Google
                      </button>
                    )}
                    redirectUri="http://localhost:3000/Usuarios"
                    cookiePolicy={"single_host_origin"}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="barra">
            <img className="logo" src={Logo} alt="logo" />
          </div>
          {/* <!-- BARRA DE MENU --> */}
          <div className="contenido">
            <p className="descripcion">
              Bienvenidos a su tienda ComprAEqui <br />
              aquí encontrará todas las marcas y referencias <br />
              de su calzado favorito, por favor sientase en <br />
              confianza e ingrese a nuestra tienda en donde <br />
              encontrará grandes descuentos
            </p>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Index;
