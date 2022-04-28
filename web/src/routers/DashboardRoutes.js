import { Redirect, Route, Switch } from "react-router-dom";
import { NavClienteAdmin } from "../components/ui/NavClienteAdmin";
import Listamenu from "../components/pag_fae_cliente/Listamenu";
import Listareserva from "../components/pag_fae_cliente/Listareserva";
import Listapendientepago from "../components/pag_fae_cliente/Listapendientepago";
import Crearmenu from "../components/pag_fae_cliente/Crearmenu";
import Crearreparto from "../components/pag_fae_admin/Crearreparto";
import Crearunidad from "../components/pag_fae_admin/Crearunidad";
import Crearcomedor from "../components/pag_fae_admin/Crearcomedor";
import Ranchero from "../components/pag_fae_admin/Ranchero";
import Estadisticas from "../components/pag_fae_admin/Estadisticas";
import Inicio from "../components/login/Inicio";

export const DashboardRoutes = () => {
    return (
        <div>
            <NavClienteAdmin />

            <div className="container mt-3">
                <Switch>
                    <Route exact path="/">
                        <Inicio />
                    </Route>
                    <Route exact path="/listamenu">
                        <Listamenu />
                    </Route>
                    <Route exact path="/listapendientepago">
                        <Listapendientepago />
                    </Route>
                    <Route exact path="/listareservas">
                        <Listareserva />
                    </Route>
                    <Route exact path="/crearmenu">
                        <Crearmenu />
                    </Route>
                    <Route exact path="/crear_reparto">
                        <Crearreparto />
                    </Route>
                    <Route exact path="/crear_unidad">
                        <Crearunidad />
                    </Route>
                    <Route exact path="/crear_comedor">
                        <Crearcomedor />
                    </Route>
                    <Route exact path="/ranchero">
                        <Ranchero />
                    </Route>
                    <Route exact path="/estadisticas">
                        <Estadisticas />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    );

};
