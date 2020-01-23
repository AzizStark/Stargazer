import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import logo from './Polygon.svg'

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        username: "",
        password: ""
        }
    }



  requireAuth = () => {
    axios.get('/api/isLogged')
    .then(res => {
        console.log("Logged")
    }).catch( err => {
        if(err.response.status === 401){
            this.props.history.push('/admin/login');
        }
    })
  }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/login", {} , 
        {auth: {
            username: this.state.username,
            password: this.state.password
            }
        })
        .then(res => {
          if (res.data) {
            this.props.history.push('/admin/dashboard');
          }
        })
        .catch(err => console.log(err));
    }
    
    render() {
        return(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 0, minHeight: '100vh'}} >
                <div className="card" style={{borderRadius: 5}}>
                    <div className="card-content">
                        <img src={logo} style={{height: 30}}/>
                        <br/><br/>
                        <form>
                            <div className="field is-grouped-centered">
                                <p className="control has-icons-left">
                                    <input onChange={ (e) => {this.setState({ username: e.target.value})}} className="input" type="email" placeholder="Email" required/>
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope}  size="1x"/>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input onChange={ (e) => {this.setState({ password: e.target.value})}} className="input" type="password" placeholder="Password" required/>
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock}  size="1x"/>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <br/>
                                <center>
                                    <button className="button is-success" onClick={this.handleSubmit}>
                                        Login
                                    </button>
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default login;