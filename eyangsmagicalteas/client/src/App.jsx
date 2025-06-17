import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Header, ProductDetail, TeaLeaves, TeaPots, TeaBags, BestSellers, ShoppingCart, CheckoutPage } from "./utils/Route";
import { SearchResults } from "./pages/search/SearchResults";
import { Layout } from "./components/common/Layout";
import { Provider } from "react-redux";
import store from "./store";
import { Admin } from "./pages/admin/Admin";
import { CartsList } from "./pages/admin/CartsList";
import { OrdersList } from "./pages/admin/OrdersList";
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
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <Layout>
                  <Admin />
                </Layout>
              }
            >
              {/* Nested Admin Routes */}
              <Route index element={<div className="admin-placeholder"><h2>Welcome to Admin Dashboard</h2><p>Please select a section from the navigation above.</p></div>} />
              <Route path="carts" element={<CartsList />} />
              <Route path="orders" element={<OrdersList />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
