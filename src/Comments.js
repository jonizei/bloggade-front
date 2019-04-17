import React, { Component } from 'react';
import './BlogArticle.css';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            comments: this.props.comments,
            updatePosts: this.props.updatePosts
        }
    }

    onDeleteClick = event => {
        event.preventDefault();
        this.deleteComment(event.target.id);
    }

    deleteComment(id) {
        fetch('http://localhost:8080/api/private/admin/delete/comment/' + id, {
            method: 'DELETE'
        }).then((httpResp) => {
            this.state.updatePosts();
        }).catch(this.onError);
    }

    onError(msg) {
        console.log(msg);
    }

    render() {
        console.log('Comments');
        let comments = this.state.comments
        let divComments = comments.map((comment) => {
        return  <div className="blog-article-content blog-text">{comment.text}
                    <div className="blog-delete" onClick={this.onDeleteClick} id={comment.id} >DEL</div>
                </div>
        })
        return <div>{divComments}</div>
    }
}

export default Comments;
