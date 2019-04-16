import React, { Component } from 'react';
import './FrontPage.css';
import BlogList from './BlogList.js';

class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode : 'browse', 
            userDetails: this.props.userDetails
        };
    }

    render() {

        return (
        <div className="page-container">
            <div className="left-sidebar"></div>
            <BlogList userDetails={this.state.userDetails} loginActions={this.props.loginActions} />
            <div className="right-sidebar"></div>
        </div>
        );
    }

}

export default FrontPage;