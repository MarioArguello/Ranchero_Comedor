import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosAddCircle } from 'react-icons/io';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import swal from 'sweetalert';

const urlComedor = "http://localhost:3000/usuario/Allcomedorreparto";
function Crearcomedor() {
    const [comedor, setComedor] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nombreComedor, setNombreComedor] = useState('');
    const [grado, setGrado] = useState([]);
    const [reparto, setReparto] = useState([]);
    const [selectedValueGradobajo, setSelectedValueGradobajo] = useState([]);
    const [selectedValueGradoalto, setSelectedValueGradoalto] = useState([]);
    const [selectedValueReparto, setSelectedValueReparto] = useState([]);

    const peticionGet = async () => {
        await axios.get(urlComedor)
            .then(response => {
                setComedor(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const rangoget = async () => {
        await axios.get("http://localhost:3000/grado/getAll")
            .then((response) => {
                console.log(response);
                setGrado(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const repartoget = async () => {
        await axios.get("http://localhost:3000/reparto/getAll")
            .then((response) => {
                console.log(response);
                setReparto(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }
    const handleChangeGrado = (e) => {
        setSelectedValueGradobajo(e.target.value)
    }
    const handleChangeGradoalto = (e) => {
        setSelectedValueGradoalto(e.target.value)
    }
    const handleChangeReparto = (e) => {
        setSelectedValueReparto(e.target.value)
    }
    const metodopostComedor = async () => {
        await axios.post(`http://localhost:3000/comedor/create`,
            {
                idreparto: selectedValueReparto,
                nombre: nombreComedor,
                estado: 'A',
                id_grado_bajo: selectedValueGradobajo,
                id_grado_alto: selectedValueGradoalto
            })
            .then(response => {
                peticionGet();
                rangoget();
                repartoget();
                setNombreComedor("")
                swal({
                    text: "Comedor creado con exito",
                    icon: "success"
                })
            }).catch(error => {
                peticionGet();
                rangoget();
                repartoget();
                setNombreComedor("")
                swal({
                    text: "Error al ingreso, revisa que todas las opciones esten elegidas.",
                    icon: "warning"
                })
            })
    }
    useEffect(() => {
        peticionGet();
        rangoget();
        repartoget();
    }, [])
    const alertacrearComedor = (idpersona, idrol) => {
        swal({
            title: "Crear Comedor",
            text: "Estas seguro que deseas crear comedor ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                if (nombreComedor === '') {
                    swal({
                        text: "Nombre del comedor esta vacio !",
                        icon: "warning"
                    });
                } else {
                    console.log("Crear comedor");
                    metodopostComedor()
                }
            }
        })
    }
    return (

        <React.Fragment>
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Crear Comedor</p>
            <br /> <br />
            <Container>
                <Row>
                    <Col sm={12} lg={5}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Crear Comedor</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalNombre">
                                        <Form.Label column sm={3}>
                                            Nombre
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Nombre comedor" onChange={(event) => setNombreComedor(event.target.value)} value={nombreComedor} />
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row} controlId="formHorizontalCodigo">
                                        <Form.Label column sm={3}>
                                            Reparto
                                        </Form.Label>
                                        <Col sm={9}>
                                            <p style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangeReparto(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione reparto
                                                    </option>
                                                    {reparto && reparto.map(elementogrado =>
                                                        <option key={elementogrado.idreparto} value={elementogrado.idreparto}>{elementogrado.nombre}</option>
                                                    )}
                                                </select></p>
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row} controlId="formHorizontalgradobajo">
                                        <Form.Label column sm={3}>
                                            Grado bajo
                                        </Form.Label>
                                        <Col sm={9}>
                                            <p style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangeGrado(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione grado
                                                    </option>
                                                    {grado && grado.map(elementogrado =>
                                                        <option key={elementogrado.idgrado} value={elementogrado.idgrado}>{elementogrado.nombre}</option>
                                                    )}
                                                </select></p>
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row} controlId="formHorizontalgradoalto">
                                        <Form.Label column sm={3}>
                                            Grado alto
                                        </Form.Label>
                                        <Col sm={9}>
                                            <p style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangeGradoalto(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione grado
                                                    </option>
                                                    {grado && grado.map(elementogrado =>
                                                        <option key={elementogrado.idgrado} value={elementogrado.idgrado}>{elementogrado.nombre}</option>
                                                    )}
                                                </select></p>
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Button className="btn btn-success" onClick={()=> alertacrearComedor()}><IoIosAddCircle size={25} />Crear Comedor</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <br /><br />
                    <Col sm={12} lg={7}>
                        <div>
                            <input type="text" placeholder="nombre de comedor o reparto.." onChange={e => setSearchTerm(e.target.value)} />
                            <button className="btn btn-success">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <br /><br />
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Listado</Card.Title>
                                <span className="d-block m-t-5">
                                    Comedores
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Reparto</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comedor && comedor.filter((comedor_) => {
                                            if (searchTerm === "") {
                                                return comedor_
                                            }
                                            else if ((comedor_.nombre.toLowerCase().includes(searchTerm.toLowerCase())) || (comedor_.reparto.nombre.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                                return comedor_;
                                            }
                                            return false;
                                        }).map((nombreComedor, key1) => {
                                            return <tr key={key1}><th scope="row">{nombreComedor.idcomedor}</th>
                                                <td>{nombreComedor.nombre}</td>
                                                <td>{nombreComedor.reparto.nombre}</td>
                                            </tr>

                                        })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
                <br /><br /><br />


            </Container>
        </React.Fragment>
    )
}

export default Crearcomedor;
