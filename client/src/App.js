import { Container } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "181490117566-3vu9jues4a17i33ffuiub3boq0dfm2rg.apps.googleusercontent.com" ;
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
          <Container maxwidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/auth" exact element={<Auth/>} />
            </Routes>
          </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    );
  }

export default App
