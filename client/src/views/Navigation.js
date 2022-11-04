import React from "react";
 
// For better looks Bootsrap:
import "bootstrap/dist/css/bootstrap.css";
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { NavLink, useNavigate } from "react-router-dom";

// Create navbar
const Navigation = () => {

    const navigate = useNavigate();

    return (
    <div>
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand>Datankanssa</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/">Dashboard</NavLink> 
                    <NavLink className="nav-link" to="/about">About</NavLink>

                    <NavDropdown title="Settings" id="basic-nav-dropdown"
                        onSelect={ (eventKey) => {
                                switch (eventKey) {
                                    case "1": 
                                        navigate("/user-settings")
                                        break;
                                    case "2": 
                                        navigate("/appearance") 
                                        break;
                                    case "3": 
                                        navigate("/privacy-and-data") 
                                        break;
                                    case "4": 
                                        navigate("/sign-out") 
                                        break;
                                    default: console.log("Error: Event key was handled, but seems like it was something we never thought could happen.")
                                }
                            }
                        }
                    >
                    <NavDropdown.Item eventKey="1">User settings</NavDropdown.Item>
                    <NavDropdown.Item eventKey="2">Appearance</NavDropdown.Item>
                    <NavDropdown.Item eventKey="3">Privacy and data</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4">Sign out</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Data, author etc."
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    );
}

export default Navigation;