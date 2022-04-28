import React, { Component } from 'react'
import { Navbar, Button, Nav } from 'react-bootstrap'



export default class NavbarComp extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Navbar.Brand href="#">Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/nuevo">Home</Nav.Link>
                            <Nav.Link to="/#">Adminstrador</Nav.Link>
                            <Nav.Link to="/#">Contact</Nav.Link>
                            <Button href="/#" >Ingresar</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
