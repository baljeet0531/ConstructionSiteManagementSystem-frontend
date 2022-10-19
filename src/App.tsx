
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layouts/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import People from './Components/People/People';
import Photo from './Components/Photo/Photo';
import Site from './Components/Site/SitePage';
import Report from './Components/Report/Report';
import Schedule from './Components/Schedule/Schedule';
import Security from './Components/Security/Security';

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout page={<Home />} />}></Route>
        <Route path="/home" element={<Layout page={<Home />} />}></Route>
        <Route path="/site" element={<Layout page={<Site />} />}></Route>
        <Route path="/schedule" element={<Layout page={<Schedule />} />}></Route>
        <Route path="/people" element={<Layout page={<People />} />}></Route>
        <Route path="/security" element={<Layout page={<Security />} />}></Route>
        <Route path="/report" element={<Layout page={<Report />} />}></Route>
        <Route path="/photo" element={<Layout page={<Photo />} />}></Route>
        <Route path="/dashboard" element={<Layout page={<Dashboard />} />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;