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
        this.createNewPost = this.createNewPost.bind(this);

        if(this.props.create) {

            this.state = {
                id : -1,
                title : '',
                author : '',
                description : '',
                content : '',
                changeMode : this.props.changeMode,
                isAdmin : this.props.isAdmin,
                isEditing : true,
                updatePosts : this.props.updatePosts,
                isCreating : true
            };

        } else {

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
    }

    onEditClick = event => {
        event.preventDefault();

        this.setState({isEditing : true});
    }

    onSubmitClick = event => {
        event.preventDefault();

        if(this.state.isEditing && this.state.isCreating) {
            this.createNewPost();
        } else if(this.state.isEditing && !this.state.isCreating) {
            this.savePostEdit();
        }
    }

    onTextChange = event => {
        event.preventDefault();

        if(event.target.name === 'blog-title') {
            this.setState({title : event.target.value});
        } else if(event.target.name === 'blog-author') {
            this.setState({author : event.target.value});
        } else if(event.target.name === 'blog-content') {
            this.setState({content : event.target.value});
        } else if(event.target.name === 'blog-description') {
            this.setState({description : event.target.value});
        }
        
    }

    onError(msg) {
        console.log(msg);
    }

    createNewPost() {

        let requestObj = {
            id : this.state.id,
            userName : this.state.author,
            blogTitle : this.state.title,
            blogDescription : this.state.description,
            blogText : this.state.content
        };

        fetch('http://localhost:8080/api/private/admin/add', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(requestObj),
            dataType: 'json'
        }).then((httpResp) => {
            console.log(httpResp);
            this.state.updatePosts();
            this.setState({isEditing : false, isCreating : false});
        }).catch(this.onError);

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
                        <div className="blog-article-title"><input type="text" name="blog-title" value={this.state.title} onChange={this.onTextChange} /></div>
                        <div className="blog-article-author"><input type="text" name="blog-author" value={this.state.author} onChange={this.onTextChange} /></div>
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
                        <div className="blog-article-textarea-header">Description</div>
                        <textarea className="blog-article-description" cols="" rows="5" name="blog-description" value={this.state.description} onChange={this.onTextChange}></textarea>
                        <div className="blog-article-textarea-header">Content</div>
                        <textarea className="blog-article-textarea" cols="" rows="30" name="blog-content" value={this.state.content} onChange={this.onTextChange}></textarea>
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