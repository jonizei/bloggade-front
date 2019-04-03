import React, { Component } from 'react';
import './FrontPage.css';
import BlogList from './BlogList.js';
import BlogArticle from './BlogArticle.js';

class FrontPage extends Component {

    constructor(props) {
        super(props);
        this.state = {mode : 'browse', isAdmin: this.props.isAdmin};
    }

    render() {
        console.log('Frontpage render()');
        let printObj = null;

        if(this.state.mode === 'read') {
            printObj = <BlogArticle />;
        } else if(this.state.mode === 'browse') {
            printObj = <BlogList isAdmin={this.state.isAdmin}/>
        }

        return (
        <div className="page-container">
            <div className="left-sidebar"></div>
            {printObj}
            <div className="right-sidebar"></div>
        </div>
        );
    }

}

export default FrontPage;