import React, {Component} from 'react';
import './BlogPost.css';

class BlogPost extends Component {

    constructor(props) {
        super(props);

        this.getHeader = this.getHeader.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
            id : this.props.id,
            title : this.props.title,
            author : this.props.author,
            description : this.props.description,
            commentsLength : this.props.commentsLength,
            onItemClick : this.props.onItemClick,
            isAdmin: this.props.isAdmin
        };
    }

    onError(msg) {
        console.log(msg);
    }

    onDeleteClick = event => {
        event.preventDefault();
        console.log(this.state.id);
        this.deletePost();
    }

    deletePost() {

        fetch('http://localhost:8080/api/private/admin/delete/' + this.state.id, {
            method: 'DELETE'
        }).then((httpResp) => {
            this.props.updatePosts();
        }).catch(this.onError);

    }

    getHeader() {

        if(this.state.isAdmin) {

            return(
                <div className="blog-header">
                        <div className="blog-title blog-text blog-title-admin">{this.state.title}</div>
                        <div className="blog-author blog-text blog-author-admin">{this.state.author}</div>
                        <div className="blog-delete" onClick={this.onDeleteClick}>DEL</div>
                </div>
            );

        }

        return(
            <div className="blog-header">
                    <div className="blog-title blog-text">{this.state.title}</div>
                    <div className="blog-author blog-text">{this.state.author}</div>
            </div>
        );

    }

    render() {
        console.log('BlogPost render');

        let header = this.getHeader();

        return(
            <div className="blog-post" key={this.state.id}>
                {header}
                <div className="blog-content">
                    <div className="blog-description blog-text">{this.state.description}</div>
                    <div className="blog-link-container">
                        <div id={this.state.id} className="blog-link blog-text" onClick={this.state.onItemClick}>Read more...</div>
                    </div>
                </div>
                <div className="blog-footer">
                    <div className="blog-comments blog-text">Comments: {this.state.commentsLength}</div>
                </div>
            </div>
        );
    }

}

export default BlogPost;