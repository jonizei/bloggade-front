import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';
import SearchBar from './SearchBar.js';

class BlogList extends Component {

    state = {url: 'http://localhost:8080/blogposts', posts : []};

    constructor() {
        super();
        this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
        this.fetchBlogPostsByKeyword = this.fetchBlogPostsByKeyword.bind(this);
        this.buildBlogPosts = this.buildBlogPosts.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
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
            array.push(<BlogPost title={obj.blogTitle} author={obj.userName} description={obj.blogDescription} />);
        }

        this.setState({posts : array});
    }

    onSearchClick = event => {
        event.preventDefault();

        this.fetchBlogPostsByKeyword(event.target.value);
    }

    render() {

        let testArr = [<BlogPost />, <BlogPost />];

        return(
            <div className="blog-container">
            <SearchBar onSearchClick={this.onSearchClick} />
            {testArr}
            </div>
        );
    }

}

export default BlogList;