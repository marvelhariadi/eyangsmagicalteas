import React from "react";
import CompanyLogo from "./assets/images/CompanyLogo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop, Home, Header } from "./utils/Route";
import { Layout } from "./components/common/Layout";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

// Step 1: Let's start with a very basic component to verify rendering works
function App() {
  return (
    <div style={{ padding: '20px', margin: '20px' }}>
      <h1>Eyang's magic teas</h1>
      <img src={CompanyLogo} alt="Eyang's Magic Teas Company Logo" />
      
      {/* Step 2: Uncomment this part to test BrowserRouter alone */}
      
      <BrowserRouter>
        <h2>Router is working</h2>
      </BrowserRouter>
     
      
      {/* Step 3: Uncomment this part to test with ScrollToTop */}
      
      <BrowserRouter>
        <ScrollToTop />
        <h2>Router with ScrollToTop is working</h2>
      </BrowserRouter>
     
      
      {/* Step 4: Uncomment this part to test with Routes */}
      
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<h2>Routes are working</h2>} />
        </Routes>
      </BrowserRouter>
     
      
      {/* Step 5: Uncomment this part to test with Layout */}
      
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <h2>Layout is working</h2>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
      
      
      {/* ISSUE HERE Step 6: Final step - full implementation */}
      
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
     
    </div>
  );
}

export default App;
