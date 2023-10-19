import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './home';
import Login from './login';
import Edit from './edit';
import BlogPost from './blogpost';
import ImageUpload from './ImageUpload';
import NotFound from './NotFound'; // Import your custom NotFound component

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/blogpost/:title" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
