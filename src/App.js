import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './login';
import Edit from './edit';
import BlogPost from './pages/Blogpost';
import ImageUpload from './ImageUpload';
import Categorie from './pages/Categorie';
import PortectedRoute from './utils/protectedroute';

import NotFound from './pages/NotFound'; // Import your custom NotFound component

import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogpost/:title" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} /> 
          <Route path="/categorie/:type" element={<Categorie />} /> 
          <Route element={<PortectedRoute/>}>
            <Route path="/edit" element={<Edit />} />
            <Route path="/imageupload" element={<ImageUpload />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
