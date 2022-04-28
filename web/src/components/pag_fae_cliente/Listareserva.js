import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import ReactExport from "react-export-excel";
import '../../assets/css/App.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { useContext } from 'react';
import { AuthContext } from '../../authentication/AuthContext';
import { Button } from 'react-bootstrap';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import logo from '../image/logo.png';
import jsPDF from "jspdf";
import "jspdf-autotable";
import '../../assets/css/nuevo.css'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const url = "http://localhost:3000/usuario/datareservaweb/";
const urlPutreserva = "http://localhost:3000/reserva/update/";

function Listareserva() {
    const [reservas, setReservas] = useState([]);
    const [tablareservas, setTablareservas] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    const { userState } = useContext(AuthContext);
    const total = reservas.map((reserva_) => Number(reserva_.cantidad)).reduce((a, b) => a + b, 0);
    const peticionGet = async () => {
        await axios.get(url + userState.idcomedor)
            .then(response => {
                console.log('response api : ', response);
                console.log('api datos 2 : ', response.data);
                setReservas(response.data);
                setTablareservas(response.data);
                console.log(reservas);

            }).catch(error => {
                console.log(error);
            })
    }
    const peticionPut = async (idreserva) => {
        console.log(idreserva);
        var putpagar = {
            estado: 'C',
        }
        await axios.put(urlPutreserva + idreserva, putpagar).then(response => {
            peticionGet();
        })
    }
    const peticionPutFiar = async (idreserva) => {
        console.log(idreserva);
        var putFiar = {
            estado: 'P',
        }
        await axios.put(urlPutreserva + idreserva, putFiar).then(response => {
            peticionGet();
        })
    }
    const filter = (event) => {
        console.log(event.target.value)
        var text = event.target.value
        const data = tablareservas;
        const newData = data.filter(function (item) {

            const idreserva = item.idreserva.toString().toUpperCase()
            const estado = item.estado.toString().toUpperCase()
            const nombre = item.personas.map((per) => {
                return (per.nombres)
            }).toString().toUpperCase()
            const dni = item.personas.map((per) => { return (per.dni) }).toString().toUpperCase()
            const menudia = item.menudia.map((menudia1) => { return (menudia1.dia) }).toString().toUpperCase()
            const menudiafecha = item.menudia.map((menudiafecha) => { return (menudiafecha.dia_fecha) }).toString().toUpperCase()

            const campo = nombre + ' ' + idreserva + ' ' + estado + ' ' + dni + ' ' + menudia + ' ' + menudiafecha
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })
        setReservas(newData)
        setBusqueda(text)

    }
    const alertaConfirmacion = (reserva) => {
        swal({
            title: "Confirmar pago",
            text: "Estás seguro que deseas confirmar pago?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                swal({
                    text: "La reserva se a cancelado con exito",
                    icon: "success"
                });
                peticionPut(reserva)
                console.log(reserva);
            }
        })
    }
    const alertaFiar = (reserva) => {
        swal({
            title: "Fiar reserva",
            text: "Estás seguro que deseas fiar?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                swal({
                    text: "La reserva se a fiado con exito",
                    icon: "success"
                });
                peticionPutFiar(reserva)
                console.log(reserva);
            }
        })
    }
    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Ranchero";
        const headers = [["Nombre", "Dni", "Correo", "Fecha", "Estado", "Precio", "Cantidad", "Total"]];

        const data = reservas.map(person => [person.personas.map((per) => per.nombres).toString().toLowerCase(),
        person.personas.map((per) => per.dni).toString().toLowerCase(),
        person.personas.map((per) => per.correo).toString().toLowerCase(),
        person.menudia.map((menudiafecha) => menudiafecha.dia_fecha).toString().toLowerCase(),
        person.estado == "A" ? "Activa" : "Pendiente",
        person.menudia.map((menudiaprecio) => new Intl.NumberFormat("en-EN").format(menudiaprecio.precio)).toString().toLowerCase(),
        new Intl.NumberFormat("en-EN").format(person.cantidad),
        person.menudia.map((menudiaprecio) => new Intl.NumberFormat("en-EN").format(menudiaprecio.precio * person.cantidad)).toString().toLowerCase()
        ]);

        let content = {
            startY: 130,
            head: headers,
            body: data
        };

        doc.text('Reporte', 275, 60);
        doc.text(title, marginLeft, 100);
        doc.addImage(logo, 'PNG', 400, 20, 110, 110);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    useEffect(() => {
        peticionGet();
        return () => {
            setReservas({}); // This worked for me
            setTablareservas({});
        };
    }, [])
    return (
        <div>
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Listado de reservas activas y pedientes de pago</p>
            <div align="center">
            <Row>
                <Col><p>Cantidad total de reservas</p><Button variant="success">{total}</Button></Col>
            </Row>
            </div>
            <Row>
                <Col >
                    <ExcelFile element={<div className="mb-2">
                        <Button variant="primary" size="lg" >
                            Excel
                        </Button> {' '}

                    </div>} filename="Excel reservas">
                        <ExcelSheet data={reservas} name="Reservas comedor">
                            <ExcelColumn label="idreserva" value="idreserva" />
                            <ExcelColumn label="Estado" value="estado" />
                            <ExcelColumn label="Nombre persona" value={(person) => person.personas.map((per) => per.nombres).toString().toLowerCase()} />
                            <ExcelColumn label="Correo" value={(person) => person.personas.map((per) => per.correo).toString().toLowerCase()} />
                            <ExcelColumn label="Telefono" value={(person) => person.personas.map((per) => per.telefono).toString().toLowerCase()} />
                            <ExcelColumn label="dni" value={(person) => person.personas.map((per) => per.dni).toString().toLowerCase()} />
                            <ExcelColumn label="dia" value={(menud) => menud.menudia.map((menudiadia) => menudiadia.dia).toString().toLowerCase()} />
                            <ExcelColumn label="fecha" value={(elemento) => elemento.menudia.map((menudiafecha) => menudiafecha.dia_fecha).toString().toLowerCase()} />
                            <ExcelColumn label="precio" value={(menud) => menud.menudia.map((menudiaprecio) => menudiaprecio.precio).toString().toLowerCase()} />
                            <ExcelColumn label="cantidad" value="cantidad" />
                        </ExcelSheet>
                    </ExcelFile>
                </Col>
                <Col md={10} >
                    <Button variant="primary" size="lg" onClick={() => exportPDF()}>
                        PDF
                    </Button>
                </Col>
            </Row>
            <div className="containerInput" >
                <input className="form-control" placeholder="Búsqueda por idreserva / Nombre / dni / fecha"
                    value={busqueda} onChange={(text) => filter(text)} />

                <button className="btn btn-success">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className='lista_scroll_reservas'>
                <Row xs={1} md={4} className="g-4">
                    {reservas && reservas.map(reserva => {

                        return (
                            <Col md={4} className="mb-2" key={reserva.idreserva}>
                                <Card className="carta" style={{ backgroundColor: reserva.estado === 'A' ? '#5DADE2' : '#9C2A1F' }}>
                                    <Card.Body key={reserva.idreserva}>
                                        <Card.Title className="row justify-content-center" value="reservaid">{reserva.idreserva}</Card.Title>
                                        <Card.Text style={{ fontSize: "22px", textAlign: "center", color: "black" }}>
                                            {reserva.personas.map(menudia => {
                                                return (
                                                    menudia.nombres
                                                )
                                            })}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush" key="lista">
                                        <ListGroupItem key="lista">Día: {reserva.menudia.map(menudia => {
                                            return (
                                                menudia.dia
                                            )
                                        })} / {reserva.menudia.map(menudia => {
                                            return (
                                                menudia.dia_fecha
                                            )
                                        })}</ListGroupItem>
                                        <ListGroupItem>{reserva.menudia.map(menudia => {
                                            return (
                                                menudia.tiporanchos.map(tiporancho => {
                                                    return (
                                                        tiporancho.nombre
                                                    )
                                                })
                                            )
                                        })}</ListGroupItem>
                                        <ListGroupItem>{reserva.menudia.map(menudia => {
                                            return (
                                                menudia.menus.map(menu => {
                                                    return (
                                                        menu.descripcion
                                                    )
                                                })
                                            )
                                        })}</ListGroupItem>
                                        <ListGroupItem>{reserva.menudia.map(menudia => {
                                            return (
                                                menudia.comedors.map(comedor => {
                                                    return (
                                                        comedor.nombre
                                                    )
                                                })
                                            )
                                        })}</ListGroupItem>
                                    </ListGroup>

                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Correo: {reserva.personas.map(persona => {
                                            return (
                                                persona.correo
                                            )
                                        })} </ListGroupItem>
                                        <ListGroupItem>Telefono: {reserva.personas.map(persona => {
                                            return (
                                                persona.telefono
                                            )
                                        })}</ListGroupItem>
                                        <ListGroupItem>DNI: {reserva.personas.map(persona => {
                                            return (
                                                persona.dni
                                            )
                                        })}</ListGroupItem>
                                        <ListGroupItem>Precio: {reserva.menudia.map(menudia_ => {
                                            return (
                                                new Intl.NumberFormat("en-EN").format(menudia_.precio)
                                            )
                                        })} Cantidad: {new Intl.NumberFormat("en-EN").format(reserva.cantidad)}
                                        </ListGroupItem>
                                        <ListGroupItem>Total a pagar: {reserva.menudia.map(menudia_ => {
                                            return (
                                                new Intl.NumberFormat("en-EN").format(menudia_.precio * reserva.cantidad)
                                            )
                                        })} </ListGroupItem>
                                    </ListGroup>

                                    <Card.Footer className="row justify-content-center" value="reservaid">

                                        <ListGroupItem>
                                            <p style={{ fontSize: "22px", textAlign: "center", color: "black" }}>{reserva.estado === 'A' ? 'Activa' : 'Pendiente de pago'}</p>
                                        </ListGroupItem>

                                    </Card.Footer>

                                    <div align="center">
                                        {reserva.estado === 'A' ?
                                            <Col className="button" >
                                                <Card.Body  >
                                                    <Button style={{ backgroundColor: '#1E8449' }} onClick={() => alertaConfirmacion(reserva.idreserva)} variant="primary" type="submit">Pagar</Button>&nbsp;&nbsp;&nbsp;&nbsp;

                                                    <Button style={{ backgroundColor: '#B03A2E' }} onClick={() => alertaFiar(reserva.idreserva)}>Fiar</Button>&nbsp;
                                                </Card.Body>
                                            </Col>
                                            : <>   <br />  <Button style={{ backgroundColor: '#1E8449' }} onClick={() => alertaConfirmacion(reserva.idreserva)} variant="primary" type="submit">Pagar</Button>&nbsp;&nbsp;&nbsp;&nbsp;<br />
                                            </>
                                        }<br />
                                    </div>
                                </Card>
                            </Col>

                        )
                    })}   <br /><br /><br /> </Row>
            </div>
        </div>
    );
}

export default Listareserva;