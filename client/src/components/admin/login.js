import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'



class login extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
        username: "",
        password: ""
        }
    }

    handleSubmit = () => {
        axios.post("/api/login", {} , 
        {auth: {
            username: this.state.username,
            password: this.state.password
            }
        })
        .then(res => {
          if (res.data) {
            this.setState({
              todos: res.data
            });
          }
        })
        .catch(err => console.log(err));
    }
    

    
    render() {
        return(
            <div style={{margin: '18% 30% 0 30%'}} className="had-text-centered">
                <div class="field is-grouped-centered">
                    <p class="control has-icons-left">
                        <input onChange={ (e) => {this.setState({ username: e.target.value})}} class="input" type="email" placeholder="Email"/>
                        <span class="icon is-small is-left">
                            <FontAwesomeIcon icon={faEnvelope}  size="1x"/>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input onChange={ (e) => {this.setState({ password: e.target.value})}} class="input" type="password" placeholder="Password"/>
                        <span class="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock}  size="1x"/>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button class="button is-success" onClick={this.handleSubmit}>
                        Login
                        </button>
                    </p>
                </div>
            </div>
        )
    }
}

export default login;