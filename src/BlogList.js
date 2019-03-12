import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';

class BlogList extends Component {

    state = {url: 'http://localhost:8080/blogposts', posts : []};

    constructor() {
        super();
        this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
        this.buildBlogPosts = this.buildBlogPosts.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    componentDidMount() {
        this.fetchBlogPosts();
    }

    fetchBlogPosts() {

        fetch(this.state.url).then((httpResp) => httpResp.json()).then(this.onSuccess);

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

    render() {
        return(
            <div className="blog-container">
            {this.state.posts}
            </div>
        );
    }

}

export default BlogList;