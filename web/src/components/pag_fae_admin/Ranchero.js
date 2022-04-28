import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HiArrowCircleDown, HiArrowCircleUp } from 'react-icons/hi';
import swal from 'sweetalert';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../assets/css/nuevo.css';
const url_person = "http://localhost:3000/usuario/Allpersonas";
const url_putRolPersona = "http://localhost:3000/usuariorol/update/";
function Ranchero() {
    const [person, setPerson] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValueMenu, setSelectedValueMenu] = useState([]);
    const [comedor, setComedor] = useState([]);
    const [reparto, setReparto] = useState([]);
    const [usuarioReparto, setusuarioReparto] = useState([]);
    const [selectedValueReparto, setSelectedValueReparto] = useState([]);
    const [idreparto_, setIdreparto_] = useState([]);
    const [idusuario, setIdusuario] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => { setModal(!modal) };

    const getpersonall = async () => {
        await axios.get(url_person)
            .then(response => {
                setPerson(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const menuget = async (reparto) => {
        await axios.get(`http://localhost:3000/usuario/ComedorReparto/${reparto}`)
            .then((response) => {
                console.log(response);
                setComedor(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }
    const repartoget = async () => {
        await axios.get(`http://localhost:3000/reparto/getAll`)
            .then((response) => {
                console.log(response);
                setReparto(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    // peticiones put de ranchero, admin o cliente
    const peticionAscenderAdmin = async (idpersona, idrol) => {
        console.log(idpersona + " rol" + idrol);
        var putActualizar = {
            idrol: 3
        }
        await axios.put(url_putRolPersona + idpersona, putActualizar).then(response => {
            getpersonall();
            swal({
                text: "El rol se a actualizado con exito",
                icon: "success"
            });
        })
    }

    const peticiondegradarcliente = async (idpersona, idrol) => {
        console.log(idpersona + " rol" + idrol);
        var putActualizar = {
            idrol: 1
        }
        await axios.put(url_putRolPersona + idpersona, putActualizar).then(response => {
            getpersonall();
            swal({
                text: "El rol se a actualizado con exito",
                icon: "success"
            });
        })
    }
    const metodoputRnachero = async () => {
        console.log("id persona a a hacer el update : " + idusuario)
        var putRanchero = {
            idreparto: selectedValueReparto,
            idcomedor: selectedValueMenu
        }
        await axios.put(`http://localhost:3000/proceso/update_ranchero/${idusuario}`, putRanchero)
            .then(response => {
                getpersonall();
                toggle();
                repartoget();
                swal({
                    text: "Persona actualizada a ranchero",
                    icon: "success"
                })
            })
    }

    const metodopostRanhero = async () => {
        console.log("persona " + idusuario + "reparto" + selectedValueReparto + " comedor : " + selectedValueMenu)
        console.log("persona_llamada : " + idusuario)
        await axios.post(`http://localhost:3000/proceso/create_ranchero/${idusuario}`,
            {
                idusuario: idusuario,
                idreparto: selectedValueReparto,
                idcomedor: selectedValueMenu
            })
            .then(response => {
                getpersonall();
                toggle();
                repartoget();
                swal({
                    text: "Persona creada a ranchero",
                    icon: "success"
                })
            })
    }
    const enviarranchero = async () => {
        console.log(idusuario)
        console.log("user2.0")
        console.log("comedor : " + selectedValueMenu)
        await axios.get(`http://localhost:3000/usuarioreparto/get/${idusuario}`)
            .then(response => {
                console.log(response.data)
                if (response.data.sms === "2") {
                    console.log("crear usuariorol metodo post")
                    swal({
                        text: "Crear usuario post..",
                        icon: "warning"
                    });
                    metodopostRanhero();
                } else if (response.data.sms === "1") {
                    console.log("else")
                    swal({
                        text: "enviar put..",
                        icon: "warning"
                    });
                    metodoputRnachero()
                }
            }).catch(error => {
                console.log(error);
            })

    }

    const handleChangeMenu = (e) => {
        setSelectedValueMenu(e.target.value)
    }
    const handleChangeReparto = (e) => {
        setSelectedValueReparto(e.target.value)
        menuget(e.target.value);
    }
    useEffect(() => {
        getpersonall();
        repartoget();
    }, [])

    const alertadegradarClienteAdmin = (idpersona, idrol) => {
        swal({
            title: "Degradar",
            text: "Estas seguro que deseas degradar a Cliente ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                console.log(" Degradado a Cliente");
                peticiondegradarcliente(idpersona, idrol)
            }
        })
    }
    const alertaAscenderAdmin = (idpersona, idrol) => {
        swal({
            title: "Ascender",
            text: "Estas seguro que deseas ascender a administrador ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                console.log("Ascendido a administrador");
                peticionAscenderAdmin(idpersona, idrol)
            }
        })
    }


    const alertaAscenderranchero = (idreparto_get) => {
        swal({
            title: "Ranchero",
            text: "Estas seguro que deseas asignar a ranchero ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                console.log("------------")
                console.log(reparto)
                console.log("---------------")
                console.log(comedor)
                console.log("------------")
                console.log(selectedValueReparto)
                console.log("---------------")
                console.log(selectedValueMenu)
                console.log("--------------user -")
                console.log(idusuario)
                enviarranchero()
            }
        })
    }
    return (
        <React.Fragment>
            <Container>
                <div className='lista_scroll'>
                    <Row>
                        <Col >
                            <div>
                                <input type="text" placeholder="Ingrese nombre de persona o dni.." onChange={e => setSearchTerm(e.target.value)} />
                                <button className="btn btn-success">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                            <br /><br />

                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Listado</Card.Title>
                                    <span className="d-block m-t-5">
                                        Personas
                                    </span>
                                </Card.Header>
                                <Card.Body>

                                    <Table  >
                                        <Thead>
                                            <Tr>
                                                <Th>#</Th>
                                                <Th>Grado</Th>
                                                <Th>Nombre</Th>
                                                <Th>DNI</Th>
                                                <Th>Correo</Th>
                                                <Th>Usuario</Th>
                                                <Th>Rol</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {person && person.filter((person_) => {
                                                if (searchTerm === "") {
                                                    return person_
                                                }
                                                else if ((person_.nombres.toLowerCase().includes(searchTerm.toLowerCase())) || (person_.dni.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                                    return person_;
                                                }
                                                return false;
                                            }).map((nombreperson, key1) => {
                                                return <Tr key={key1} style={{
                                                    border: "6px solid #FFFFFF"
                                                }}>
                                                    <Th> {nombreperson.idpersona}</Th>
                                                    <Td> {nombreperson.grado.nombre}</Td>
                                                    <Td>{nombreperson.nombres}</Td>
                                                    <Td>{nombreperson.dni}</Td>
                                                    <Td> {nombreperson.correo}</Td>
                                                    <Td>{nombreperson.usuario.username}</Td>
                                                    <Td style={{ backgroundColor: "#64B5F6" }}>{nombreperson.usuario.usuariorol.idrol === 1 ?
                                                        "Cliente"
                                                        : nombreperson.usuario.usuariorol.idrol === 2 ? "Ranchero" : "Administrador"}
                                                    </Td>

                                                    <Td>{nombreperson.usuario.usuariorol.idrol === 1 ?
                                                        <Button type="button" className="btn btn-success" onClick={() => alertaAscenderAdmin(nombreperson.usuario.idusuario, nombreperson.usuario.usuariorol.idrol)}><HiArrowCircleUp size={25} /> Ascender a Admin</Button>
                                                        : nombreperson.usuario.usuariorol.idrol === 2 ?
                                                            <Button type="button" className="btn btn-success" onClick={() => alertaAscenderAdmin(nombreperson.usuario.idusuario, nombreperson.usuario.usuariorol.idrol)}><HiArrowCircleUp size={25} /> Ascender a Admin</Button>
                                                            :
                                                            <Button type="button" className="btn btn-danger" onClick={() => alertadegradarClienteAdmin(nombreperson.usuario.idusuario, nombreperson.usuario.usuariorol.idrol)}><HiArrowCircleDown size={25} /> Degradar a Cliente</Button>
                                                    }</Td>
                                                    <Td></Td>
                                                    <Td>{nombreperson.usuario.usuariorol.idrol === 1 ?
                                                        <Button type="button" className="btn btn-success" onClick={() => { toggle(); setIdusuario(nombreperson.usuario.idusuario) }}><HiArrowCircleUp size={25} /> Ascender a Ranchero</Button>
                                                        : nombreperson.usuario.usuariorol.idrol === 2 ?
                                                            <Button type="button" className="btn btn-danger" onClick={() => alertadegradarClienteAdmin(nombreperson.usuario.idusuario, nombreperson.usuario.usuariorol.idrol)}><HiArrowCircleDown size={25} /> Degradar a cliente</Button>
                                                            :
                                                            <Button type="button" className="btn btn-danger" onClick={() => { toggle(); setIdusuario(nombreperson.usuario.idusuario) }}><HiArrowCircleDown size={25} /> Degradar a Ranchero</Button>
                                                    }</Td>
                                                </Tr>
                                            })
                                            }

                                        </Tbody>
                                    </Table>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row></div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader style={{ display: 'block' }}> Ascender a Ranchero
                        <Button className="btn btn-danger" style={{ float: 'right' }} onClick={toggle}>
                            X{" "}
                        </Button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <br />
                            <label htmlFor="nombre">Reparto: </label>
                            <select onChange={(e) => handleChangeReparto(e)} defaultValue={"default"}>
                                <option value={"default"} disabled>
                                    Seleccione reparto
                                </option>
                                {reparto && reparto.map(elementomenu =>
                                    <option key={elementomenu.idreparto} value={elementomenu.idreparto}>{elementomenu.nombre}</option>
                                )}
                            </select>
                            <br />
                            <label htmlFor="nombre">Comedor: </label>
                            <select onChange={(e) => handleChangeMenu(e)} defaultValue={"default"}>
                                <option value={"default"} disabled>
                                    Seleccione comedor
                                </option>
                                {comedor && comedor.map(elementomenu =>
                                    <option key={elementomenu.idcomedor} value={elementomenu.idcomedor}>{elementomenu.nombre}</option>
                                )}
                            </select>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-success"
                            onClick={() =>
                                alertaAscenderranchero()
                            } >
                            Asignar
                        </Button>
                    </ModalFooter>
                </Modal>
                <br /><br />
            </Container>
        </React.Fragment>
    );
}
export default Ranchero;

