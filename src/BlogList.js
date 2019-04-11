import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';
import SearchBar from './SearchBar.js';
import BlogArticle from './BlogArticle';

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

        this.state = {
            url: 'http://localhost:8080/api/public/blogposts',
            blogObjects : [],
            posts : [],
            mode : 'browse',
            isAdmin: this.props.isAdmin
        };
    }

    componentDidMount() {
        this.updateBlogList();
    }

    updateBlogList() {
        this.setState({posts : [], blogObjects : []});
        this.fetchBlogPosts();
    }

    fetchBlogPosts() {

        fetch(this.state.url).then((httpResp) => httpResp.json()).then(this.onSuccess);

    }

    fetchBlogPostsByKeyword(keyword) {

        fetch(this.state.url + '/search?keyword=' + keyword).then((httpResp) => httpResp.json()).then(this.onSuccess);

    }

    onSuccess(jsonObject) {
            
        let array = [];
        
        for(let obj of jsonObject) {
            array.push(obj);
        }


        this.setState({blogObjects : array});
        this.buildBlogPosts(array);
    }

    buildBlogPosts(postArray) {

        let array = [];

        for(let obj of postArray) {
            array.push(<BlogPost isAdmin={this.state.isAdmin} id={obj.id} title={obj.blogTitle} author={obj.userName} description={obj.blogDescription} 
                onItemClick={this.onItemClick} updatePosts={this.updateBlogList} comments={this.comments}/>);
        }

        this.setState({posts : array});
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

    onItemClick = event => {
        event.preventDefault();


        let clickedPost = this.findBlogPostById(event.target.id);

        this.setState({mode : 'read', article : <BlogArticle isAdmin={this.state.isAdmin} id={clickedPost.id} title={clickedPost.blogTitle} 
        author={clickedPost.userName} description={clickedPost.blogDescription} content={clickedPost.blogText} changeMode={this.changeMode} 
        updatePosts={this.updateBlogList} comments={clickedPost.comments} />});
    }

    onCreateClick = event => {
        event.preventDefault();

        this.setState({mode : 'create', article : <BlogArticle isAdmin={this.state.isAdmin} changeMode={this.changeMode} updatePosts={this.updateBlogList} create={true} />});
    }

    changeMode = event => {
        event.preventDefault();

        if(event.target.id === 'exit-article') {
            this.setState({mode : 'browse'});
        }
    }

    render() {
        console.log('BlogList render()');
        console.log(this.state.isAdmin);

        let renderObj = this.state.posts;

        if(this.state.mode === 'read' || this.state.mode === 'create') {
            renderObj = this.state.article;
        }

        let actionBar = <div className="blog-list-action-bar" onClick={this.onCreateClick}>CREATE POST</div>;

        if(this.state.isAdmin) {

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
                <SearchBar onSearchClick={this.onSearchClick} />
                {actionBar}
                {renderObj}
                </div>
            );

        }

        return(
            <div className="blog-container">
            <SearchBar onSearchClick={this.onSearchClick} />
            {renderObj}
            </div>
        );
    }

}

export default BlogList;