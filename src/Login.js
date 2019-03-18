import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    render() {
        return(
            <div className="page-container">
                <div className="login-dialog">
                    <div className="input-container">
                        <div className="username-input">
                            <label className="input-label">Username:</label>
                            <input type="text" name="username" />
                        </div>

                        <div className="password-input">
                            <label className="input-label">Password:</label>
                            <input type="password" name="password" />
                        </div>

                        <div className="submit-input">
                            <input className="login-button" type="submit" value="Login" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;