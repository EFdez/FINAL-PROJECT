import React, { Component } from 'react'
import SchoolHackApi from '../../../service/SchoolHackApi'

import UserCard from './user-card'
import UserForm from '../User-form'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: undefined,
            showModal: false
        }
        this.schoolHackApi = new SchoolHackApi()
    }

    componentDidMount = () => this.updatedUsersList()


    updatedUsersList = () => {

        this.schoolHackApi
            .getAllUsers()
            .then(response => { this.setState({ users: response.data }) })
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleUsersSubmit = () => {

        this.handleModal(false)
        this.updatedUsersList()
    }

    render() {
        return (
            <>

                <Container as="main">
                    <h3>Estudiantes:</h3>
                    {
                        /*this.props.loggedInUser && */<Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Nuevo estudiante</Button>
                    }

                    {
                        !this.state.users ? <h3>Cargando...</h3> :

                            <Row>
                                {this.state.users.map(elm => <UserCard key={elm._id} {...elm} />)}
                            </Row>

                    }
                </Container>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <UserForm handleUsersSubmit={this.handleUsersSubmit} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default Users