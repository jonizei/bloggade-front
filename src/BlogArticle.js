import React, { Component } from 'react';
import './BlogArticle.css';

class BlogArticle extends Component {

    render() {
        return(
            <div className="blog-article-container">
                <div className="blog-article">
                    <div className="blog-article-header blog-text">
                        <div className="blog-article-title">Article 1</div>
                        <div className="blog-article-author">Author 1</div>
                    </div>
                    <div className="blog-article-content blog-text">Test</div>
                </div>
            </div>
        );
    }

}

export default BlogArticle;