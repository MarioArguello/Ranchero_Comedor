import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card  } from 'react-bootstrap';
import NVD3Chart from 'react-nvd3';
const urlReservaAll = "http://localhost:3000/reserva/getAll";
function Estadisticas() {
    const [reservas, setReservas] = useState([]);
    const [searchTerm] = useState('A');
    const [searchTermPendientepago] = useState('P');
    const [searchTermCancelado] = useState('C');
    const total = reservas.map((reserva_) => Number(reserva_.cantidad)).reduce((a, b) => a + b, 0);
    const activas = reservas.filter((person_) => {
        if (person_.estado.toLowerCase().includes(searchTerm.toLowerCase())) {
            return person_;
        }
        return false;
    }).map((reserva_) => Number(reserva_.cantidad)).reduce((a, b) => a + b, 0)
    const porcentajeActivas = new Intl.NumberFormat("en-EN").format((activas / total) * 100)


    const pendientespago = reservas.filter((person_) => {
        if (person_.estado.toLowerCase().includes(searchTermPendientepago.toLowerCase())) {
            return person_;
        }
        return false;
    }).map((reserva_) => Number(reserva_.cantidad)).reduce((a, b) => a + b, 0)

    const porcentajePendientepago = new Intl.NumberFormat("en-EN").format((pendientespago / total) * 100)

    const cancelado = reservas.filter((person_) => {
        if (person_.estado.toLowerCase().includes(searchTermCancelado.toLowerCase())) {
            return person_;
        }
        return false;
    }).map((reserva_) => Number(reserva_.cantidad)).reduce((a, b) => a + b, 0)

    const porcentajeCancelado = new Intl.NumberFormat("en-EN").format((cancelado / total) * 100)
    const datum = [
        {
            key: 'Cumulative Return',
            values: [
                {
                    label: 'Activas',
                    value: activas,
                    color: '#3ebfea'
                },
                {
                    label: 'Pendiente pago',
                    value: pendientespago,
                    color: '#04a9f5'
                },
                {
                    label: 'Cancelado',
                    value: cancelado,
                    color: '#ff8a65'
                }
            ]
        }
    ];


    const peticiongetReservas = async () => {
        await axios.get(urlReservaAll).then(response => {
            setReservas(response.data);

        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {

        peticiongetReservas();
    }, [])
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4} >
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Total de reservas</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> {total}                                                     </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">100%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme"
                                    role="progressbar"
                                    style={{ width: '100%' }}
                                    aria-valuenow="100"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>


                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Reservas Activas</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> {activas}
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">{porcentajeActivas}%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme2"
                                    role="progressbar"
                                    style={{ width: `${porcentajeActivas}%` }}
                                    aria-valuenow={porcentajeActivas}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Reservas pendientes de pago</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> {pendientespago}
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">{porcentajePendientepago}%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme2"
                                    role="progressbar"
                                    style={{ width: `${porcentajePendientepago}%` }}
                                    aria-valuenow={porcentajePendientepago}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <div align="center">
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className="mb-4">Reservas pagadas</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> {cancelado}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{porcentajeCancelado}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div
                                        className="progress-bar progress-c-theme"
                                        role="progressbar"
                                        style={{ width: `${porcentajeCancelado}%` }}
                                        aria-valuenow={porcentajeCancelado}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </Row>
            <br />
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Admin</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            Ventajas de un gráfico de barras Representación de los datos de forma sencilla: 
                            Los gráficos de barras representan una recopilación de datos que pueden ser comparados con otros. Por otro lado, también se observa el intervalo de tiempo que puede ser aplicado, es decir:
                             meses, años, días, etc. Es el método más fácil y popular para la representación de datos y su mayor entendimiento. Su realización resulta sencilla para su explicación, también, para los jóvenes
                              o niños que deseen simbolizar datos resulta divertido por los colores a utilizar. Los gráficos de barras son llamativos.
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Gráficas de barras</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <NVD3Chart tooltip={{ enabled: true }} type="discreteBarChart" datum={datum} x="label" y="value" height={400} width={500} showValues />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>

    );
}

export default Estadisticas;