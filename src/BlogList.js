import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';
import SearchBar from './SearchBar.js';
import BlogArticle from './BlogArticle';

class BlogList extends Component {

    constructor() {
        super();
        this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
        this.fetchBlogPostsByKeyword = this.fetchBlogPostsByKeyword.bind(this);
        this.buildBlogPosts = this.buildBlogPosts.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.changeMode = this.changeMode.bind(this);

        this.state = {
            url: 'http://localhost:8080/blogposts',
            blogObjects : [],
            posts : [],
            mode : 'browse'
        };
    }

    componentDidMount() {
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

        this.buildBlogPosts(array);
    }

    buildBlogPosts(postArray) {

        let array = [];

        for(let obj of postArray) {
            array.push(<BlogPost id={obj.id} title={obj.blogTitle} author={obj.userName} description={obj.blogDescription} onItemClick={this.onItemClick} />);
        }

        this.setState({posts : array});
    }

    onSearchClick = event => {
        event.preventDefault();

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

        this.setState({mode : 'read', article : <BlogArticle title={clickedPost.blogTitle} author={clickedPost.userName} content={clickedPost.blogText} changeMode={this.changeMode} />});
    }

    changeMode = event => {
        event.preventDefault();

        if(event.target.id === 'exit-article') {
            this.setState({mode : 'browse'});
        }
    }

    render() {

        let renderObj = this.state.posts;

        if(this.state.mode === 'read') {
            renderObj = this.state.article;
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