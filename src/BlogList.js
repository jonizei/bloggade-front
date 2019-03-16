import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';
import BlogArticle from './BlogArticle';

class BlogList extends Component {

    constructor() {
        super();
        this.fetchBlogPosts = this.fetchBlogPosts.bind(this);
        this.buildBlogPosts = this.buildBlogPosts.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.changeMode = this.changeMode.bind(this);

        this.state = {
            url: 'http://localhost:8080/blogposts',
            blogObjects : [{id : 1, blogTitle : "Test", userName : "TestUser", blogText : "Content"}],
            posts : [<BlogPost id={1} onItemClick={this.onItemClick} />],
            mode : 'browse'
        };
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
        let idCounter = 0;

        for(let obj of postArray) {
            array.push(<BlogPost id={idCounter} title={obj.blogTitle} author={obj.userName} description={obj.blogDescription} onItemClick={this.onItemClick} />);
            idCounter++;
        }

        this.setState({posts : array});
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
            {renderObj}
            </div>
        );
    }

}

export default BlogList;