
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Button } from 'react-bootstrap';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import { AuthContext } from '../../authentication/AuthContext';
import { useContext } from 'react';

import '../../assets/css/nuevo.css';

function Listamenu() {

    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);
    const urlPutreserva = "http://localhost:3000/menudia/update/";
    const { userState } = useContext(AuthContext);
    const [menu, setMenu] = useState([]);
    const [selectedValueMenu, setSelectedValueMenu] = useState([]);
    const [idmenudia, setIdmenudia] = useState([]);
    const [precio, setPrecio] = useState([]);
    const toggle = () => { setModal(!modal) };

    const peticionEliminar = async (idreserva) => {
        console.log(idreserva);
        var eliminar = {
            estado: 'E',
        }
        await axios.put(urlPutreserva + idreserva, eliminar).then(response => {
            swal({
                text: "La reserva se a eliminado con exito",
                icon: "success"
            });
            peticionGet();
        })
    }
    const peticionGet = async () => {
        await axios.get(`http://localhost:3000/usuario/datatiporanchowebCliente/${userState.idcomedor}/${userState.idreparto}`)
            .then(response => {
                setUsuarios(response.data);

            }).catch(error => {
                console.log(error);
            })
    }

    const alertaEliminar = (reserva) => {
        swal({
            title: "Eliminar",
            text: "Estás seguro que deseas Eliminar reserva?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                peticionEliminar(reserva)
                console.log(reserva);
            }
        })
    }

    const menuget = async () => {
        await axios.get("http://localhost:3000/menu/getAll")
            .then((response) => {
                console.log(response);
                setMenu(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const peticionPutactualizar = async (idmenudia) => {
        console.log(idmenudia);
        var putActualizar = {
            idmenu: selectedValueMenu,
            precio: precio,
        }
        await axios.put("http://localhost:3000/menudia/update/" + idmenudia, putActualizar).then(response => {
            peticionGet();
            menuget();
            toggle();
            swal({
                text: "El menu se a actualizado con exito",
                icon: "success"
            });
        })
    }
    const handleChangeMenu = (e) => {
        setSelectedValueMenu(e.target.value)
    }
    const putMenu = (idmenudia) => {
        setIdmenudia(idmenudia);
    }
    const alertaConfirmacion = () => {
        swal({
            title: "Actualizar",
            text: "Estás seguro que deseas actualizar menu?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                peticionPutactualizar(idmenudia)
                console.log(idmenudia + " : precio : " + precio);

            }
        })
    }

    useEffect(() => {
        peticionGet();
        menuget();
    }, [])

    return (
        <div className="Listamenu">
            <p style={{ fontSize: "50px", textAlign: "center", color: "black" }}>
                {usuarios.map((user) => user.nombre)}
            </p>
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Listado de menú activados para la semana</p>
            <br />
            <div className="second_input">
                <input type="text" className='name' placeholder="Ingrese fecha...." onChange={e => setSearchTerm(e.target.value)} />
                <button className="btn btn-success">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            
            <br />
            <div className='lista_scroll'>
            <Row xs={1} md={4} className="g-4">
                {usuarios &&
                    usuarios.map((user) => user.menudia.filter((menud) => {
                        if (searchTerm === "") {
                            return menud
                        }
                        else if (menud.dia_fecha.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return menud;
                        }
                        return false;
                    }).map((menud, key) => {
                        return <Col key={menud.idmenudia} md={4} className="mb-2">
                            <Card className="carta" style={{ backgroundColor: '#5DADE2' }}>
                                <Card.Body >
                                    <Card.Title className="row justify-content-center" value="reservaid">{menud.dia}</Card.Title>
                                    <Card.Text style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
                                        {menud.dia_fecha}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup>
                                    <ListGroupItem>
                                        {menud.tiporanchos.map((tipor) => tipor.nombre)}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {menud.menus.map((menu) => menu.descripcion)}
                                    </ListGroupItem>
                                    <ListGroupItem> $
                                        {new Intl.NumberFormat("en-EN").format(menud.precio)}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div align="center">
                                            <Button className="btn btn-primary" onClick={() => {
                                                toggle();
                                                putMenu(menud.idmenudia);
                                            }}><FontAwesomeIcon icon={faEdit} /></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button className="btn btn-danger" onClick={() => alertaEliminar(menud.idmenudia)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    })

                    )
                }
            </Row>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{ display: 'block' }}> Actualizar menú

                    <Button className="btn btn-danger" style={{ float: 'right' }} onClick={toggle}>
                        X{" "}
                    </Button>

                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <br />
                        <label htmlFor="nombre">Menu: </label>
                        <br />

                        <select onChange={(e) => handleChangeMenu(e)} defaultValue={"default"}>
                            <option value={"default"} disabled>
                                Seleccione menú
                            </option>
                            {menu && menu.map(elementomenu =>
                                <option key={elementomenu.idmenu} value={elementomenu.idmenu}>{elementomenu.descripcion}</option>
                            )}
                        </select>
                        <br /> <br />
                        <label htmlFor="nombre" >Precio :</label>  <br /><br />
                        <input className="precio" type="number" name="precio" id="precio" onChange={(event) => setPrecio(event.target.value)} value={precio} />
                        <br />

                    </div>
                </ModalBody>

                <ModalFooter>

                    <Button className="btn btn-success" onClick={alertaConfirmacion} >
                        Actualizar
                    </Button>
                </ModalFooter>

            </Modal>

            <br /><br />
        </div>
    );
}

export default Listamenu;
