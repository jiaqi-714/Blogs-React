import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flipped, Flipper } from "react-flip-toolkit";

const BlogList = ({ blogs, title }) => {
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
    setShuffledBlogs(blogs);
  }, [blogs]);

  const handleShuffle = () => {
    const shuffled = [...shuffledBlogs].sort(() => Math.random() - 0.5);
    setShuffledBlogs(shuffled);
  };

  return (
    <Flipper flipKey={shuffledBlogs.map(blog => blog.id).join(",")}>
      <div className="blog-list">
        <h4>{title}</h4>
        <button onClick={handleShuffle}>Shuffle</button>
        {shuffledBlogs.map(blog => (
          <Flipped key={blog.id} flipId={blog.id}>
            <div className="blog-preview">
              <Link to={`/blogs/${blog.id}`}>
                <h2>{blog.title}</h2>
                <p className="blog-info">
                  <span className="author">{blog.author}</span>
                  <span className="post-info">
                    Post ID: {blog.id} | Posted on: {blog.post_date}
                  </span>
                </p>
              </Link>
            </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
};

export default BlogList;
