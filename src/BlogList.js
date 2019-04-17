import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';
import SearchBar from './SearchBar.js';
import BlogArticle from './BlogArticle';
import Login from './Login';

class BlogList extends Component {

    constructor(props) {
        super(props);
        this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
        this.fetchBlogPostsByKeyword = this.fetchBlogPostsByKeyword.bind(this);
        this.buildBlogPosts = this.buildBlogPosts.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.updateBlogList = this.updateBlogList.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.getLoginButton = this.getLoginButton.bind(this);
        this.findCommentsByBlogPostId = this.findCommentsByBlogPostId.bind(this);

        this.state = {
            url: 'http://localhost:8080/api/public/blogposts',
            blogObjects : [],
            posts : [],
            mode : 'browse',
            userDetails : this.props.userDetails,
            isLoading: false
        };
    }

    componentDidMount() {
        this.updateBlogList();
    }

    updateBlogList() {
        this.setState({posts : [], blogObjects : [], isLoading: true});
        this.fetchBlogPosts();
    }

    fetchBlogPosts() {
        fetch(this.state.url).then((httpResp) => httpResp.json()).then(this.onSuccess);

    }

    fetchBlogPostsByKeyword(keyword) {

        fetch(this.state.url + '/search?keyword=' + keyword).then((httpResp) => httpResp.json()).then(this.onSuccess);

    }

    onSuccess(jsonObject) {
        
        console.log(jsonObject);

        let array = [];
        
        for(let obj of jsonObject) {
            array.push(obj);
        }


        //this.setState({blogObjects : array, isLoading: false});
        this.buildBlogPosts(array);
    }

    buildBlogPosts(postArray) {
        console.log('buildBlogPosts');

        let array = [];

        for(let obj of postArray) {
            array.push(<BlogPost userDetails={this.state.userDetails} id={obj.id} title={obj.blogTitle} author={obj.userName} description={obj.blogDescription} onItemClick={this.onItemClick} updatePosts={this.updateBlogList} commentsLength={obj.comments.length} />);
        }

        this.setState({posts : array, blogObjects : postArray, isLoading: false});
    }

    onSearchClick = event => {
        event.preventDefault();

        this.setState({blogObjects : [], posts : []});

        this.fetchBlogPostsByKeyword(event.target.value);
    }
    
    findBlogPostById(id) {

        let foundPost = null;

        id = parseInt(id);

        for(let b of this.state.blogObjects) {
            if(b.id === id) {
                foundPost = b;
            }
        }

        return foundPost;
    }

    findCommentsByBlogPostId(id) {
        console.log('findCommentsByBlogPostId: ' + id);
        let blogPost;
        if (id === -1) {
            return null;
        }
        blogPost = this.findBlogPostById(id);
        console.log(blogPost);
        return blogPost.comments;
    }

    onItemClick = event => {
        event.preventDefault();


        let clickedPost = this.findBlogPostById(event.target.id);

        this.setState({mode : 'read', article : <BlogArticle userDetails={this.state.userDetails} id={clickedPost.id} title={clickedPost.blogTitle} 
        author={clickedPost.userName} description={clickedPost.blogDescription} content={clickedPost.blogText} changeMode={this.changeMode} 
        updatePosts={this.updateBlogList} findCommentsByBlogPostId={this.findCommentsByBlogPostId}/>});
    }

    onCreateClick = event => {
        event.preventDefault();

        this.setState({mode : 'create', article : <BlogArticle userDetails={this.state.userDetails} changeMode={this.changeMode} updatePosts={this.updateBlogList} create={true} findCommentsByBlogPostId={this.findCommentsByBlogPostId} />});
    }

    changeMode(action) {

        if(action === 'exit-article' || action === 'do-login') {
            this.setState({mode : 'browse'});
        }
    }

    goToLogin = event => {
        event.preventDefault();

        this.setState({mode : 'login'});
    }

    doLogout = event => {
        event.preventDefault();

        this.props.loginActions.handleLogout();
    }

    getLoginButton() {

        let btn = <div className="blog-login-button" onClick={this.goToLogin.bind(this)}>LOG<br />IN</div>;

        if(this.state.userDetails.role === 'ROLE_ADMIN' || this.state.userDetails.role === 'ROLE_USER') {
            btn = <div className="blog-login-button" onClick={this.doLogout.bind(this)}>LOG<br />OUT</div>;
        }

        return btn;
    }

    render() {

        console.log('BlogList render()');

        if(!this.state.isLoading) {
                
            let renderObj = this.state.posts;

        if(this.state.mode === 'read' || this.state.mode === 'create') {
            renderObj = this.state.article;
        } else if(this.state.mode === 'login') {
            return(
                <div className='blog-container'>
                    <Login onLogin={this.props.loginActions.tryLogin} changeMode={this.changeMode} />
                </div>
            );
        }

            let actionBar = <div className="blog-list-action-bar" onClick={this.onCreateClick}>CREATE POST</div>;

        if(this.state.userDetails.role === 'ROLE_ADMIN') {

                if(this.state.mode === 'read' || this.state.mode === 'create') {

                    return(
                        <div className="blog-container">
                        <SearchBar onSearchClick={this.onSearchClick} />
                        {renderObj}
                        </div>
                    );

                }

                return(
                    <div className="blog-container">
                    <div className="blog-login-button-container">
                        {this.getLoginButton()}
                    </div>
                    <SearchBar onSearchClick={this.onSearchClick} />
                    {actionBar}
                    {renderObj}
                    </div>
                );

            }

            return(
                <div className="blog-container">
                <div className="blog-login-button-container">
                    {this.getLoginButton()}
                </div>
                <SearchBar onSearchClick={this.onSearchClick} />
                {renderObj}
                </div>
            );
        } else {
            return <div>Loading...</div>
        }
    }

}

export default BlogList;