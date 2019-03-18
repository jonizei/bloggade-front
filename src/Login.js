import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onSubmit : this.props.onSubmit
        }
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
                                    <td><input className="input-field" type="text" name="username" /></td>
                                </tr>
                                <tr className="input-row">
                                    <td><label className="input-label">Password:</label></td>
                                    <td><input className="input-field" type="password" name="password" /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="submit-input">
                            <button className="login-button" onClick={this.state.onSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;