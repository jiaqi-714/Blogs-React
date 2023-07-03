import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './conponent/Navbar';
import Home from './conponent/Home';
import Create from "./conponent/Create";
import BlogDetails from "./conponent/BlogDetails";
import NotFound from "./conponent/NotFound";
import PaginationPage from "./conponent/PaginationPage";


function App() {
  const [activeIndex, setActiveIndex] = useState(false);

  const handleSetActiveIndex = (index) => {
    setActiveIndex(index);
  };

  return ( 
    <Router> {/* Add the Router component as the parent */}
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/page" element={<PaginationPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
