
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosAddCircle } from 'react-icons/io';
import { VscQuestion } from 'react-icons/vsc';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';

const urlReparto = "http://localhost:3000/reparto/getAll";
function Crearreparto() {
    const [reparto, setReparto] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [unidad, setUnidad] = useState([]);
    const [selectedValueUnidad, setSelectedValueUnidad] = useState([]);
    const [repartotexto, setRepartoTexto] = useState('');
    const [codigo, setCodigo] = useState('');
    const peticionGet = async () => {
        await axios.get(urlReparto)
            .then(response => {
                setReparto(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const unidadget = async () => {
        await axios.get("http://localhost:3000/unidad/getAll")
            .then((response) => {
                console.log(response);
                setUnidad(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleChangeUnidad = (e) => {
        setSelectedValueUnidad(e.target.value)
    }
    useEffect(() => {
        peticionGet();
        unidadget();
    }, [])
    const metodopostReparto = async () => {
        await axios.post(`http://localhost:3000/reparto/create`,
            {
                idunidad: selectedValueUnidad,
                nombre: repartotexto,
                codigo: codigo,

            })
            .then(response => {
                peticionGet();
                unidadget();
                setRepartoTexto("")
                setCodigo("")
                swal({
                    text: "Reparto creada con exito",
                    icon: "success"
                })
            }).catch(error => {
                swal({
                    text: "Error al enviar al api",
                    icon: "warning"
                })
                peticionGet();
                unidadget();
                setRepartoTexto("")
                setCodigo("")
            }
            )
    }
    const alertacrearReparto = (idpersona, idrol) => {
        swal({
            title: "Crear Reparto",
            text: "Estas seguro que deseas crear nuevo Reparto ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                if (repartotexto === '' || codigo === '') {
                    swal({
                        text: "Nombre reparto, codigo o select de Unidad estan vacios !",
                        icon: "warning"
                    });
                    setRepartoTexto("")
                    setCodigo("")
                } else {
                    console.log("Crear reparto");
                    metodopostReparto()
                }
            }
        })
    }


    return (

        <React.Fragment>
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Crear Reparto</p>
            <br /> <br />
            <Container>
                <Row>
                    <Col sm={12} lg={5}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Crear Reparto</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalNombre">
                                        <Form.Label column sm={3}>
                                            Unidad
                                        </Form.Label>
                                        <Col sm={9}>
                                            <p style={{ fontSize: "18px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangeUnidad(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione unidad
                                                    </option>
                                                    {unidad && unidad.map(elemento =>
                                                        <option key={elemento.idunidad} value={elemento.idunidad}>{elemento.nombre}</option>
                                                    )}
                                                </select></p>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalNombre">
                                        <Form.Label column sm={3}>
                                            Nombre
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Nombre reparto" onChange={(event) => setRepartoTexto(event.target.value)} value={repartotexto} />
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row} controlId="formHorizontalCodigo">
                                        <Form.Label column sm={3}>
                                            Codigo
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Codigo" onChange={(event) => setCodigo(event.target.value)} value={codigo} />
                                        </Col>
                                    </Form.Group>
                                    <br />
                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Button className="btn btn-success" onClick={() => alertacrearReparto()}><IoIosAddCircle size={25} />Crear Reparto</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <br /><br />
                    <Col sm={12} lg={7}>
                        <div>
                            <input type="text" placeholder="Ingrese nombre de unidad.." onChange={e => setSearchTerm(e.target.value)} />
                            <button className="btn btn-success">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <br /><br />
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Listado</Card.Title>
                                <span className="d-block m-t-5">
                                    Reparto
                                </span>
                            </Card.Header>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Codigo</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reparto && reparto.filter((reparto_) => {
                                            if (searchTerm === "") {
                                                return reparto_
                                            }
                                            else if (reparto_.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return reparto_;
                                            }
                                            return false;
                                        }).map((nombreReparto, key1) => {
                                            return <tr key={key1}><th scope="row">{nombreReparto.idreparto}</th>
                                                <td>{nombreReparto.nombre}</td>
                                                <td>{nombreReparto.codigo}</td>
                                                <td><button type="button" className="btn btn-info"><VscQuestion size={25} /></button></td>
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

export default Crearreparto;
