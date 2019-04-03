import React, {Component} from 'react';
import './BlogPost.css';

class BlogPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.id,
            title : this.props.title,
            author : this.props.author,
            description : this.props.description,
            comments : 0,
            onItemClick : this.props.onItemClick,
            isAdmin: this.props.isAdmin
        };
    }

    render() {
        return(
            <div className="blog-post" key={this.state.id}>
                <div className="blog-header">
                    <div className="blog-title blog-text">{this.state.title}</div>
                    <div className="blog-author blog-text">{this.state.author}</div>
                    <div className="blog-delete">DEL</div>
                </div>
                <div className="blog-content">
                    <div className="blog-description blog-text">{this.state.description}</div>
                    <div className="blog-link-container">
                        <div id={this.state.id} className="blog-link blog-text" onClick={this.state.onItemClick}>Read more...</div>
                    </div>
                </div>
                <div className="blog-footer">
                    <div className="blog-comments blog-text">Comments: {this.state.comments}</div>
                </div>
            </div>
        );
    }

}

export default BlogPost;