import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flipped, Flipper } from "react-flip-toolkit";
import { motion } from "framer-motion";
import PaginationButtons from "./PaginationButtons";
import RandomCreate from "./RondomCreate";


const BlogList = ({ blogs, title, activeIndex, setActiveIndex }) => {
  const [sortedByAuthor, setSortedByAuthor] = useState(false);
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  useEffect(() => {
    setCurrentBlogs(blogs);
    setCurrentPage(1);
  }, [blogs]);

  useEffect(() => {
    paginate(1);
  }, [currentBlogs]);

  const buttonVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const handleShuffle = () => {
    const shuffled = [...blogs].sort(() => Math.random() - 0.5);
    setCurrentBlogs(shuffled);
    setSortedByAuthor(false);
  };

  const handleSortByAuthor = () => {
    const sorted = [...blogs].sort((a, b) => a.author.localeCompare(b.author));
    setCurrentBlogs(sorted);
    setSortedByAuthor(true);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogsPaginated = currentBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const blogVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <Flipper flipKey={currentBlogs.map((blog) => blog.id).join(",")}>
      <div className="button-container">
        <RandomCreate activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <motion.button onClick={handleShuffle} 
          variants={buttonVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Shuffle
        </motion.button>
        <motion.button onClick={handleSortByAuthor}           
          variants={buttonVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={sortedByAuthor}
        >
            Sort by Author
        </motion.button>
      </div>
      <div className="blog-list">
        <h4>{title}</h4>
        {currentBlogsPaginated.map((blog) => (
          <Flipped key={blog.id} flipId={blog.id}>
            <motion.div
              className="blog-preview"
              variants={blogVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Link to={`/blogs/${blog.id}`}>
                <h2>{blog.title}</h2>
                <p className="blog-info">
                  <span className="author">{blog.author}</span>
                  <span className="post-info">
                    Post ID: {blog.id} | Posted on: {blog.post_date}
                  </span>
                </p>
              </Link>
            </motion.div>
          </Flipped>
        ))}
        <PaginationButtons
          totalPages={Math.ceil(currentBlogs.length / blogsPerPage)}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </Flipper>
  );
};

export default BlogList;
