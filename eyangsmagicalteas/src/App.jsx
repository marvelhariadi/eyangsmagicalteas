import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Header } from "./utils/Route";
import { Layout } from "./components/common/Layout";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    // <Provider> provides redux store access
    <div>
      <Provider store={store}> 
        <BrowserRouter>
          {/* ScrollToTop is removed to prevent automatic scrolling */}
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
