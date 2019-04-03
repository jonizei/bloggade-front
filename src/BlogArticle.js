import React, { Component } from 'react';
import './BlogArticle.css';

class BlogArticle extends Component {

    constructor(props) {
        super(props);

        this.getHeader = this.getHeader.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.savePostEdit = this.savePostEdit.bind(this);

        this.state = {
            id : this.props.id,
            title : this.props.title,
            author : this.props.author,
            description : this.props.description,
            content : this.props.content,
            changeMode : this.props.changeMode,
            isAdmin : this.props.isAdmin,
            isEditing : false,
            updatePosts : this.props.updatePosts
        };
    }

    onEditClick = event => {
        event.preventDefault();

        this.setState({isEditing : true});
    }

    onSubmitClick = event => {
        event.preventDefault();

        this.savePostEdit();
    }

    onTextChange = event => {
        event.preventDefault();

        this.setState({content : event.target.value});
    }

    onError(msg) {
        console.log(msg);
    }

    savePostEdit() {

        let requestObj = {
            id : this.state.id,
            userName : this.state.author,
            blogTitle : this.state.title,
            blogDescription : this.state.description,
            blogText : this.state.content
        };

        fetch('http://localhost:8080/api/private/admin/edit', {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(requestObj),
            dataType: 'json'
        }).then((httpResp) => {
            console.log(httpResp);
            this.state.updatePosts();
            this.setState({isEditing : false});
        }).catch(this.onError);

    }

    getHeader() {

        if(this.state.isAdmin) {

            if(this.state.isEditing) {

                return(

                    <div className="blog-article-header blog-text">
                        <div className="blog-article-title">{this.state.title}</div>
                        <div className="blog-article-author">{this.state.author}</div>
                        <div className="blog-article-submit" onClick={this.onSubmitClick}>SUB<br />MIT</div>
                    </div>
    
                );

            }

            return(

                <div className="blog-article-header blog-text">
                    <div className="blog-article-title">{this.state.title}</div>
                    <div className="blog-article-author">{this.state.author}</div>
                    <div className="blog-article-edit" onClick={this.onEditClick}>EDIT</div>
                </div>

            );

        }


        return(

            <div className="blog-article-header blog-text">
                    <div className="blog-article-title">{this.state.title}</div>
                    <div className="blog-article-author">{this.state.author}</div>
            </div>

        );

    }

    render() {

        let header = this.getHeader();

        if(this.state.isEditing) {

            return(

                <div className="blog-article">
                    <div className="action-bar">
                        <div className="exit-link blog-text" id="exit-article" onClick={this.state.changeMode}>Back to browsing</div>
                    </div>
                    {header}
                    <div className="blog-article-content blog-text">
                        <textarea className="blog-article-textarea" cols="" rows="30" onChange={this.onTextChange}>
                            {this.state.content}
                        </textarea>
                    </div>
                </div>

            );

        } else {
            
            return(
                <div className="blog-article">
                    <div className="action-bar">
                        <div className="exit-link blog-text" id="exit-article" onClick={this.state.changeMode}>Back to browsing</div>
                    </div>
                    {header}
                    <div className="blog-article-content blog-text">{this.state.content}</div>
                </div>
            );

        }

    }

}

export default BlogArticle;