import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);

        this.state = {
            keyword : '',
            onSearchClick : this.props.onSearchClick
        };
    }

    onInputChange = event => {
        event.preventDefault();

        this.setState({keyword : event.target.value});
    }

    render() {
        return(
            <div className="search-container">
                <div className="search-input-container">
                    <input type="text" className="input-search" onChange={this.onInputChange}/>
                </div>
                <div className="search-button-container">
                    <button className="button-search" onClick={this.state.onSearchClick} value={this.state.keyword}>Search</button>
                </div>
            </div>
        );
    }

}

export default SearchBar;