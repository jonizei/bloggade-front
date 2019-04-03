import React, { Component } from 'react';
import './BlogArticle.css';

class BlogArticle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title : this.props.title,
            author : this.props.author,
            content : this.props.content,
            changeMode : this.props.changeMode
        };
    }

    render() {
        return(
            <div className="blog-article">
                <div className="action-bar">
                    <div className="exit-link blog-text" id="exit-article" onClick={this.state.changeMode}>Back to browsing</div>
                </div>
                <div className="blog-article-header blog-text">
                    <div className="blog-article-title">{this.state.title}</div>
                    <div className="blog-article-author">{this.state.author}</div>
                </div>
                <div className="blog-article-content blog-text">{this.state.content}</div>
            </div>
        );
    }

}

export default BlogArticle;