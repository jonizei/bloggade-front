import React, { Component } from 'react';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }

    onSubmit = event => {
        event.preventDefault();

        if(this.state.password === this.state.confirmPassword) {
            this.props.onSignUp(this.state.username, this.state.password); 
        }
    }

    handleChange = event => {
        event.preventDefault();

        switch(event.target.name) {
            case 'username':
                this.setState({username : event.target.value});
                break;

            case 'password':
                this.setState({password : event.target.value});
                break;

            case 'confirm_password':
                this.setState({confirmPassword : event.target.value});
                break;

            default:
                break;
        }
    }

    render() {
        return(
            <div className="page-container">
                <div className="login-dialog">

                    <div className="login-header">
                        <h1>Sign Up</h1>
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
                                <tr className="input-row">
                                    <td><label className="input-label">Confirm password:</label></td>
                                    <td><input className="input-field" type="password" name="confirm_password" onChange={this.handleChange} value={this.state.confirmPassword} /></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="submit-input">
                            <button className="login-button" onClick={this.onSubmit}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUp;