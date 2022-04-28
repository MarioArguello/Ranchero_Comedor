import { useContext } from 'react';
import { useHistory} from "react-router-dom";
import { AuthContext } from '../../authentication/AuthContext';
import { types } from '../../types/types';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import { FcOrganization } from 'react-icons/fc';
import { IoIosRestaurant, IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineSetting, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import perfil from '../../assets/img/perfil.png'
export const NavClienteAdmin = () => {

    const { userState } = useContext(AuthContext);
    // console.log(userState);

    const context = useContext(AuthContext);

    const history = useHistory();

    const handleLogout = () => {

        context.dispatch({ type: types.logout });

        history.replace('/login');

    };

    return (
        <>
            <br />
            {userState.rol === 2 ? <Navbar expand="lg" style={{
                background:
                    '#2980B9', height: '85px', display: 'flex'
            }}>
                <Container style={{
                    background:
                        '#2980B9'
                }}>
                    <Navbar.Brand href="/">Rancho FAE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/listareservas">Reservas</Nav.Link>
                            <Nav.Link href="/listapendientepago">Reservas pendiente de pago</Nav.Link>
                            <Nav.Link href="/listamenu">Lista de menú</Nav.Link>
                            <Nav.Link href="/crearmenu">Ingreso de menu</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <AiOutlineSetting size={40} />&nbsp;&nbsp;
                        <Navbar.Text>
                            Opciones
                        </Navbar.Text>&nbsp;&nbsp;&nbsp;&nbsp;

                        <NavDropdown title="" id="navbarDropdown" menuVariant="#607D8B" style={{
                            background:
                                '#37474F', color: 'white', display: 'flex'
                        }}>
                            <div className="pro-head" >
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={perfil} width="50" height="50" className="img-radius" alt="User Profile" />
                                &nbsp;&nbsp;
                                <span>
                                    {userState.name}
                                </span>
                            </div> 
                            <NavDropdown.Divider />
                            <div align="center">
                                <Button variant="outline-danger" onClick={handleLogout}> <AiOutlineLogout size={30} />Logout</Button>
                            </div>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Container>
            </Navbar> : <Navbar expand="lg" style={{
                background:
                    '#2980B9', height: '85px', display: 'flex'
            }}>
                <Container style={{
                    background:
                        '#2980B9'
                }}>
                    <Navbar.Brand href="/">Rancho FAE Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Crear.." id="navbar_Dropdown" menuVariant="#607D8B" style={{
                                display: 'flex'
                            }}><IoMdAddCircleOutline size={20} />
                                <NavDropdown.Item href="/crear_unidad"><FcOrganization size={25} />Unidad</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/crear_reparto"><FcOrganization size={25} />Reparto</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/crear_comedor"><IoIosRestaurant size={25} />Comedor</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <Nav.Link href="/ranchero">Roles Personas</Nav.Link>
                            <Nav.Link href="/estadisticas">Estadisticas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">

                        <AiOutlineSetting size={40} />&nbsp;&nbsp;
                        <Navbar.Text>
                            Opciones
                        </Navbar.Text>&nbsp;&nbsp;&nbsp;&nbsp;

                        <NavDropdown title="" id="navbarDropdown" menuVariant="#607D8B" style={{
                            background:
                                '#37474F', color: 'white', display: 'flex'
                        }}>
                             <div className="pro-head" >
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={perfil} width="50" height="50" className="img-radius" alt="User Profile" />
                                &nbsp;&nbsp;
                                <span>
                                    {userState.name}
                                </span>
                            </div>
                            <NavDropdown.Divider />
                            <div align="center">
                                <Button variant="outline-danger" onClick={handleLogout}> <AiOutlineLogout size={30} />Logout</Button>
                            </div>
                        </NavDropdown>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            }
            <br /><br /><br />
        </>
    );

};