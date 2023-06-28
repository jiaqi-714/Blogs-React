import React, { useEffect, useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
    const [name, setName] = useState("Erika");
    const [age, setAge] = useState(20);

    const {isPending, data: blogs, error} = useFetch("http://localhost:5000/blogs")
    const handleClick = (e) => {
        setAge(22);
        setName("Momo");
    }
    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter((blog) => blog.id !== id)
    //     setBlogs(newBlogs)
    // }
    
    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>loading... ...</div>}
            {blogs && <BlogList blogs = {blogs} title = "All blogs"></BlogList>}
            {/* <BlogList blogs = {blogs.filter((blog) => blog.author === "mario")} title = "Mario's blogs" handleDelete={handleDelete}></BlogList> */}
            {/* <br /> */}
            {/* <p>{name} is {age} years olds.</p>
            <button onClick={() => handleClick()}>Click me</button> */}
            {/* <button onClick={(e) => handleClickAgain("mario", e)}>Click me again</button> */}
        </div>
    );
}

export default Home;