import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onError = this.onError.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = event => {
        event.preventDefault();

        if(event.target.name === 'username') {
            this.setState({username : event.target.value});
        } else if(event.target.name === 'password') {
            this.setState({password : event.target.value});
        }
    }

    onSubmit = event => {
        event.preventDefault();

        if(this.props.changeMode !== undefined) {
            this.props.changeMode('do-login');
        }

        this.props.onLogin(this.state.username, this.state.password);
    }

    onError(msg) {
        console.log(msg);
    }

    render() {
        return(
            <div className="page-container">
                <div className="login-dialog">

                    <div className="login-header">
                        <h1>Login</h1>
                    </div>

                    <div className="input-container">

                        <table className="input-grid">
                            <tbody>
                                <tr className="input-row">
                                    <td><label className="input-label">Username:</label></td>
                                    <td><input className="input-field" type="text" name="username" onChange={this.handleChange} value={this.state.username} /></td>
                                </tr>
                                <tr className="input-row">
                                    <td><label className="input-label">Password:</label></td>
                                    <td><input className="input-field" type="password" name="password" onChange={this.handleChange} value={this.state.password} /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="submit-input">
                            <button className="login-button" onClick={this.onSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;