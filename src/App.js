import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './login';
import Edit from './edit';
import BlogPost from './pages/Blogpost';
import ImageUpload from './ImageUpload';

import NotFound from './pages/NotFound'; // Import your custom NotFound component

import './styles/App.css';

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
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
