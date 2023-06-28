import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {
    // const blogs = props.blogs;
    // const title = props.title;

    return (
        <div className = "blog-list">
            <h4>{title}</h4>
            {blogs.map(blog => (
                <div className='blog-preview' key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>{blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList;