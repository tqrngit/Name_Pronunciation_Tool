import React, { Component } from 'react';
import './LoginForm.css';
import { withRouter } from 'react-router-dom';

// LOGIN SCREEN
class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          emailOrUsername: "",
          password: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
          [target.name]: target.value,
        });
    }

  async handleSubmit(event) {
      event.preventDefault();
      console.log('Username: '+ this.state.emailOrUsername);
      const username = this.state.emailOrUsername.toLowerCase();
      let isUserFound = false;
        if(!username) {
            alert("ERROR: Username or AD-ENT id should not be empty!!")
        }

      const response = await fetch('/clients',{
          method:'GET',
          headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      }
          });

      if(response.ok) {
          let respText = await response.text();
          let respJsonObj = JSON.parse(respText);
          console.log(respText);
          for(let i in respJsonObj) {
          if(respJsonObj[i].uid != null){
          console.log(i+':'+respJsonObj[i].uid.toLowerCase());
          }
            if(respJsonObj[i].uid != null && respJsonObj[i].uid.toLowerCase() === username){
            isUserFound = true;
                this.props.history.push('/clients/'+respJsonObj[i].id);
                break;
            }

          }

      } else {
          alert("Error: Unable to get user details Code: "+response.status+' '+response.statusText);
      }

      if(username === 'admin'){
        this.props.history.push('/clients');
      }else if(!isUserFound) {
      this.props.history.push('/clients/new');
      }

      // User not found create new user



    }

     render(){
          return(
            <div id="loginform">
              <FormHeader title="Login" />
            <div>

<div className="row">
    <label>Username</label>
    <input type="text" placeholder="Enter your AD-ENT id" name="emailOrUsername" value={this.state.emailOrUsername}
                                                                                               onChange={this.handleInputChange}/>
  </div>
                 <div id="button" className="row">
                     <button onClick={this.handleSubmit}>Log in</button>
                   </div>
               </div>
          </div>
        )
      }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);



export default withRouter(LoginForm);
