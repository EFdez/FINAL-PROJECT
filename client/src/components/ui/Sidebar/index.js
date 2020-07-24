import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Row'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './../../App.css'

const Side = props => {


    return (

        <div className="left-sidebar" contenteditable>
            <Nav className=" d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}>

                <Nav.Item>
                    <NavLink to="/messages">Mensajes</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/events">Eventos</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/profile">Perfil</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/courses">Cursos</NavLink>
                </Nav.Item>
            </Nav>
        </div>

    );
};
const Sidebar = withRouter(Side);
export default Sidebar