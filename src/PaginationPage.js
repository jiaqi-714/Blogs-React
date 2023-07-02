import React, { useEffect, useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const PaginationPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [emptyBlog, setEmptyBlog] = useState(false);
    const blogsPerPage = 2; // Number of blogs per page

    const { isPending, data: blogs, error } = useFetch(`http://localhost:5000/page?page=${currentPage}&perPage=${blogsPerPage}`);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div >
            {error && <div>{error}</div>}
            {isPending && <div>loading... ...</div>}
            {blogs&& <BlogList blogs = {blogs.blogs} title = "All blogs"></BlogList>}

            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
            </button>
            <button onClick={handleNextPage} disabled={isPending || (blogs && blogs.total_pages <= currentPage)}>
                Next Page
            </button>
        </div>
    );
};

export default PaginationPage;
