import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosAddCircle } from 'react-icons/io';
import { VscQuestion } from 'react-icons/vsc';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import "bootstrap/dist/css/bootstrap.min.css";
const urlUnidad = "http://localhost:3000/unidad/getAll";
function Crearunidad() {
    const [unidad,setUnidad]= useState([]);
    const [unidadtexto, setUnidadTexto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const peticionGet = async () => {
        await axios.get(urlUnidad)
            .then(response => {
                setUnidad(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const metodopostUnidad = async () => {
        await axios.post(`http://localhost:3000/unidad/create`,
            {
                nombre: unidadtexto,
                codigo: codigo
              
            })
            .then(response => {
                peticionGet();
                setUnidadTexto("")
                setCodigo("")
                swal({
                    text: "Unidad creada con exito",
                    icon: "success"
                })
            })
    }
    const alertacrearUnidad = () => {
        swal({
            title: "Crear unidad",
            text: "Estas seguro que deseas crear nueva unidad ?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
               if( unidadtexto === ''  || codigo === '' ){
                swal({
                    text: "Nombre unidad o codigo estan vacios !",
                    icon: "warning"
                });
               }else{
                console.log("Crear unidad");
                metodopostUnidad()
               }
            }
        })
    }
    useEffect(() => {
        peticionGet();
    }, [])
    return (

        <React.Fragment>
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Crear Unidad</p>
            <br /> <br />
            <Container>
                <Row>
                    <Col sm={12} lg={5}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Crear Unidad</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalNombre">
                                        <Form.Label column sm={3}>
                                            Nombre
                                        </Form.Label>
                                        <Col sm={9}>
                                        <Form.Control type="text" placeholder="Nombre" onChange={(event) => setUnidadTexto(event.target.value)} value={unidadtexto} />
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
                                            <Button className="btn btn-success" onClick={()=> alertacrearUnidad()}><IoIosAddCircle size={25} />Crear Unidad</Button>
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
                                    Unidad
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
                                        {unidad && unidad.filter((unidad_) => {
                                            if (searchTerm === "") {
                                                return unidad_
                                            }
                                            else if (unidad_.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return unidad_;
                                            }
                                            return false;
                                        }).map((nombreUnidad, key1) => {
                                            return <tr key={key1}><th scope="row">{nombreUnidad.idunidad}</th>
                                                <td>{nombreUnidad.nombre}</td>
                                                <td>{nombreUnidad.codigo}</td>
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

export default Crearunidad;
