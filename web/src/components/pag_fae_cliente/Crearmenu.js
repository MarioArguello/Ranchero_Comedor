import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/nuevo.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { AuthContext } from '../../authentication/AuthContext';
import { useContext } from 'react';
registerLocale('es', es);
var precio = [
    {
        "idprecio": 1,
        "valor": 3,

    },
    {
        "idprecio": 2,
        "valor": 4,

    },
    {
        "idprecio": 3,
        "valor": 5,

    }
];
function Crearmenu() {
    const [dateTime, setDateTime] = useState(new Date());
    const [tiporancho, setTiporancho] = useState([]);
    const [menu, setMenu] = useState([]);
    const [selectedValueMenu, setSelectedValueMenu] = useState([]);
    const [selectedValuePrecio, setSelectedValuePrecio] = useState([]);
    const { userState } = useContext(AuthContext);
    const options = { weekday: 'long' };

    const tiporanchoget = async () => {
        await axios.get(`http://localhost:3000/tiporancho/getAll`)
            .then((response) => {
                console.log(response);
                setTiporancho(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }
    const onChange = (fecha) => {
        setDateTime(fecha);
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
    
    const peticionPostMenudia = async (idtiporancho_,idmenu_,idcomedor_,dia_,precio_,estado_,dia_fecha_) => {
        console.log(idtiporancho_+" : menu : " +idmenu_+" comedor : "+idcomedor_ + " dia :" +dia_ + " : precio : "+precio_ +" : estado: " +estado_ + " : fecha : "+ dia_fecha_);
        await axios.post("http://localhost:3000/menudia/create", {
            idtiporancho: idtiporancho_,
            idmenu: idmenu_,
            idcomedor:idcomedor_,
            dia: dia_,
            precio: precio_,
            estado: estado_,
            dia_fecha: dia_fecha_
        }).then(response => {
            swal({
                text: "Felicidades, el menu se a creado con exito",
                icon: "success"
            });
            tiporanchoget();
            menuget();
        })
    }

    const enviarmenu = async (idtiporancho) => {
        console.log(dateTime.toLocaleDateString('fr-CA'))
        console.log(idtiporancho)
        await axios.get(`http://localhost:3000/usuario/menudia_dia/${idtiporancho}/${dateTime.toLocaleDateString('fr-CA')}/${userState.idcomedor}`)
            .then(response => {
                console.log(response.data)
                if (response.data.msg === "1") {
                    console.log("Menu dia ya esta activo" + response.data.fecha)
                    swal({
                        text: "El menu ingresa no se a podido registrar, revisa la fecha..",
                        icon: "warning"
                    });
                } else {
            
                    peticionPostMenudia(idtiporancho,selectedValueMenu,userState.idcomedor,
                        dateTime.toLocaleDateString('es-ES', options), selectedValuePrecio,'A',dateTime.toLocaleDateString('fr-CA')
                        )
                    console.log("Puede ingresar menu")
                    console.log("----")
                    console.log(idtiporancho)
                }
            }).catch(error => {
                console.log(error);
            })

    }

    const alertacrearmenu = (idtiporancho_) => {
        swal({
            title: "Crear menu",
            text: "Estás seguro que deseas crear menu?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(repuesta => {
            if (repuesta) {
                enviarmenu(idtiporancho_)
            }
        })
    }
    useEffect(() => {
        tiporanchoget();
        menuget();
    }, [])
    const handleChangeMenu = (e) => {
        setSelectedValueMenu(e.target.value)
    }
    const handleChangePrecio = (e) => {
        setSelectedValuePrecio(e.target.value)
    }
    return (
        <>
            <div >
            <p style={{ fontSize: "30px", textAlign: "center", color: "black" }}>Crear Menú</p>
<br/>
                <p style={{ fontSize: "25px", textAlign: "center" }}>Ingrese fecha</p>
               
                <div  align="center" style={{ fontSize: "18px", textAlign: "center" }} >
                    <DatePicker class="center-block" locale="es" dateFormat="dd 'de' MMMM 'de' yyyy" selected={dateTime} onChange={onChange} />
                </div>
                <br /><br />
                <Row xs={1} md={4} className="g-4">
                    {tiporancho && tiporancho.map(tiporancho => {
                        return (
                            <Col key={tiporancho.idtiporancho} md={4} className="mb-2" >
                                <Card className="carta" style={{ backgroundColor: '#5DADE2' }}>
                                    <Card.Body>
                                        <Card.Title className="row justify-content-center" value="tiporanchoid">Id.. {tiporancho.idtiporancho}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush" >
                                        <ListGroupItem style={{ fontSize: "20px", textAlign: "center" }}>{tiporancho.nombre}</ListGroupItem>
                                    </ListGroup>                                      <Card.Footer className="row justify-content-center" value="tiporanchoid">
                                        <ListGroupItem>
                                            <p style={{ fontSize: "18px" }}> Menu:</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <p style={{ fontSize: "18px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangeMenu(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione menú
                                                    </option>
                                                    {menu && menu.map(elementomenu =>
                                                        <option key={elementomenu.idmenu} value={elementomenu.idmenu}>{elementomenu.descripcion}</option>
                                                    )}
                                                </select></p>
                                        </ListGroupItem>
                                    </Card.Footer>
                                    <Card.Footer className="row justify-content-center" value="tiporanchoid">
                                        <ListGroupItem>
                                            <p style={{ fontSize: "18px" }}> Precio:</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <p style={{ fontSize: "18px", textAlign: "center", color: "black" }}>
                                                <select onChange={(e) => handleChangePrecio(e)} defaultValue={"default"}>
                                                    <option value={"default"} disabled>
                                                        Seleccione precio
                                                    </option>
                                                    {precio.map(elementomenu => (
                                                        <option name="valor" key={elementomenu.idprecio} value={elementomenu.valor}>{elementomenu.valor}</option>
                                                    ))}
                                                </select></p>
                                        </ListGroupItem>
                                    </Card.Footer>

                                    <Col style={{ fontSize: "18px", textAlign: "center", color: "black" }} >
                                        <Card.Body  >
                                            <Button type="submit" value="Submit" style={{ backgroundColor: '#1E8449' }} onClick={() => alertacrearmenu(tiporancho.idtiporancho)}>Crear menu</Button>

                                            <h1>..</h1>
                                        </Card.Body>
                                    </Col>


                                </Card>
                            </Col>

                        )
                    })}    </Row>
                <br /><br /><br />


            </div></>
    );
}

export default Crearmenu;
