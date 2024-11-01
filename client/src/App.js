import { Container } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails  from './components/PostDetails/PostDetails.jsx';

const App = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate replace to="/posts"/>}/>
              <Route path="/posts" element={<Home/>} />
              <Route path="/posts/search" element={<Home/>} />
              <Route path="/posts/:id" element={<PostDetails/>} />
            <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    );
  }

export default App
