import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    render() {
        const {clients} = this.state;

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.uid}</td>
                <td>{client.last_name},{client.first_name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <h2 className="AppCenter-Text">Name Pronunciation</h2>
                <Container fluid>
                    <div className="float-right">
                        <Button color="danger" tag={Link} to="/clients/new">Add User</Button>
                    </div>
                    <h3>Employee Names</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">User ID</th>
                            <th width="30%">Last Name, First Name</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ClientList;