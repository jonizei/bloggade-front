import React, { Component } from 'react';
import './BlogArticle.css';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            comments: this.props.comments,
            updatePosts: this.props.updatePosts,
            userDetails: this.props.userDetails
        }
    }

    onDeleteClick = event => {
        event.preventDefault();
        this.deleteComment(event.target.id);
    }

    deleteComment(id) {
        fetch('http://localhost:8080/api/private/admin/delete/comment/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.state.userDetails.token}`
            }
        }).then((httpResp) => {
            this.state.updatePosts();
        }).catch(this.onError);
    }

    onError(msg) {
        console.log(msg);
    }

    render() {
        let comments = this.state.comments
        let divComments;

        if (this.state.userDetails.role === 'ROLE_ADMIN') {
            divComments = comments.map((comment) => {
                return  <div className="blog-article-content blog-text">{comment.text}
                            <div className="blog-delete-comment" onClick={this.onDeleteClick} id={comment.id} >DEL</div>
                        </div>
                })
        } else {
            divComments = comments.map((comment) => {
                return  <div className="blog-article-content blog-text">{comment.text}
                        </div>
                })
        }


   
        return <div>{divComments}</div>
    }
}

export default Comments;
