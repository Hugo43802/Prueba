import "styles/App.css";
import "styles/estilos.css";
import "styles/administracion.css";
import "styles/usuarios.css";
import "media/icomoon/style.css";
import "styles/ventas.css"


import VentaAdmin from "./pages/Ventas";
import Index1 from "./pages/Index";
import Usuarios from "pages/Usuarios";
import Administracion from "pages/Administracion";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div classNamee="App">
      <Router>
        <Switch>
          <Route path="/Usuarios" component={Usuarios}>
            <Usuarios />
          </Route>
          <Route path="/Ventas" component={VentaAdmin}>
            <VentaAdmin />
          </Route>
          <Route path="/producto" component={Administracion}>
            <Administracion />
          </Route>
          <Route path="/">
            <Index1 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
