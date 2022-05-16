import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import LoginForm from './LoginForm';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <h2 className="AppCenter-Text">Name Pronunciation</h2>
                <LoginForm/>
            </div>
        );
    }
}

export default Home;