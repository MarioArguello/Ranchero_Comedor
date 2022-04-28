import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import imag2 from '../../assets/img/fae2.jpg';
import imag3 from '../../assets/img/fae3.jpg';
import imag4 from '../../assets/img/fae4.jpg';

function Inicio() {

  return (
    <div>
      <div>
        <h4 style={{ fontSize: "30px", textAlign: "center", color: "black" }} > Bienvenido  </h4>
        <br />
        <Carousel>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={imag2}
              alt="Image One"
              width="50" height="500"
            />

          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img
              className="d-block w-100"
              src={imag3}
              alt="Image One"
              width="50" height="500"

            />

          </Carousel.Item>
          <Carousel.Item interval={8000}>
            <img
              className="d-block w-100"
              src={imag4}
              alt="Image One"
              width="50" height="500"

            />

          </Carousel.Item>
        </Carousel>
      </div>
      <br /><br />
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Admin</Card.Title>
            </Card.Header>
            <Card.Body>
              El administrador tiene el control de poder crear nuevos administradores, clientes o ranchero.
              Aparte de poder crear nuevas sucursales con respecto a unidad y reparto que este le asigne.
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Ranchero</Card.Title>
            </Card.Header>
            <Card.Body>
              El control del ranchero se basa en poder confirmar y fiar  las respectivas reservas de platos del comedor asignado,
              tiene el control de crear, modificar y eliminar los menus de la semana.
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br/> <br/> <br/>
    </div>
  );
}

export default Inicio;

