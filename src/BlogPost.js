import React, {Component} from 'react';
import './BlogPost.css';

class BlogPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title : this.props.title,
            author : this.props.author,
            description : this.props.description,
            comments : 0
        };
    }

    render() {
        return(
            <div className="blog-post">
                <div className="blog-header">
                    <div className="blog-title blog-text">{this.state.title}</div>
                    <div className="blog-author blog-text">{this.state.author}</div>
                </div>
                <div className="blog-content">
                    <div className="blog-description blog-text">{this.state.description}</div>
                    <div class="blog-link blog-text">Read more...</div>
                </div>
                <div className="blog-footer">
                    <div className="blog-comments blog-text">Comments: {this.state.comments}</div>
                </div>
            </div>
        );
    }

}

export default BlogPost;