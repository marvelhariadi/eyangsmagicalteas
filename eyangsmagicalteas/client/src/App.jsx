import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Header, ProductDetail, TeaLeaves, TeaPots, TeaBags, BestSellers, ShoppingCart, CheckoutPage } from "./utils/Route";
import { SearchResults } from "./pages/search/SearchResults";
import { Layout } from "./components/common/Layout";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    // <Provider> provides redux store access
    <div>
      <Provider store={store}> 
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              }
            />
            <Route
              path="/category/tea-leaves"
              element={
                <Layout>
                  <TeaLeaves />
                </Layout>
              }
            />
            <Route
              path="/category/tea-pots"
              element={
                <Layout>
                  <TeaPots />
                </Layout>
              }
            />
            <Route
              path="/category/tea-bags"
              element={
                <Layout>
                  <TeaBags />
                </Layout>
              }
            />
            <Route
              path="/category/best-sellers"
              element={
                <Layout>
                  <BestSellers />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <ShoppingCart />
                </Layout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResults />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </Provider>
     
    </div>
  );
}

export default App;
