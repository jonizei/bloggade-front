import React, {Component} from 'react';
import './BlogList.css';
import BlogPost from './BlogPost.js';

class BlogList extends Component {

    render() {
        return(
            <div className="blog-container">
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
                <BlogPost />
            </div>
        );
    }

}

export default BlogList;