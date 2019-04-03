import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);

        this.state = {
            keyword : '',
            onSearchClick : this.props.onSearchClick
        };
    }

    onLoginClick = event => {
        event.preventDefault();

        if(event.target.value === 'login') {
            window.location.replace('/login');
        }
    }

    onInputChange = event => {
        event.preventDefault();

        this.setState({keyword : event.target.value});
    }

    render() {
        return(
            <div className="header-container">
                <div className="login-button-container">
                    <button className="login-button-nav" onClick={this.onLoginClick} value="login">Login</button>
                </div>
                <div className="search-container">
                    <div className="search-input-container">
                        <input type="text" className="input-search" onChange={this.onInputChange}/>
                    </div>
                    <div className="search-button-container">
                        <button className="button-search" onClick={this.state.onSearchClick} value={this.state.keyword}>Search</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default SearchBar;