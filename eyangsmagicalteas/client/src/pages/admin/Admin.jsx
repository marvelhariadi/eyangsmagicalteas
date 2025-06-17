import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/admin/admin.scss";

export const Admin = () => {
  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-navigation">
          <NavLink 
            to="/admin/carts" 
            className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}
          >
            Shopping Carts List
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}
          >
            Orders List
          </NavLink>
        </div>
        
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
