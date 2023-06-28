import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import Thing from "./Thing";
import RandomCreate from "./RandonCreate";


function App() {

  const thing = {

  }
  return ( 
    <Router> {/* Add the Router component as the parent */}
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/rc" element={<RandomCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
