import React, {Component} from 'react';
import './BlogPost.css';

class BlogPost extends Component {

    render() {
        return(
            <div className="blog-post">
                <div className="blog-header">
                    <div className="blog-title blog-text">Title 1</div>
                    <div className="blog-author blog-text">Author 1</div>
                </div>
                <div className="blog-content">
                    <div className="blog-description blog-text">Description</div>
                </div>
                <div className="blog-footer">
                    <div className="blog-comments blog-text">Comments</div>
                </div>
            </div>
        );
    }

}

export default BlogPost;