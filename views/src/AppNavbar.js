import React, {Component} from 'react';
import './AppNavbar.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';

// Navigation bar to display WellsFargo Header

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar className="navigation">
            <NavbarBrand color="dark" tag={Link} to="/">
            <img hspace="18"
                    src="../wf_logo2.png"

                    className="d-inline-block align-top"
                    alt="WELLS FARGO"
                  />
            </NavbarBrand>
        </Navbar>;
    }
}