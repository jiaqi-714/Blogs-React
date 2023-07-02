import React, { useEffect, useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = ({ activeIndex, setActiveIndex}) => {
    // console.log(isActive)
    const {isPending, data: blogs, error} = useFetch("http://localhost:5000/blogs", activeIndex)
    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>loading... ...</div>}
            {blogs && <BlogList blogs = {blogs} title = "All blogs" activeIndex={activeIndex} setActiveIndex={setActiveIndex}></BlogList>}
        </div>
    );
}

export default Home;