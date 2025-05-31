import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import CompanyLogo from "../../assets/images/CompanyLogo.png";
import { Cart } from "./Cart";

export const Header = () => {
  // Use useEffect for event listeners to prevent multiple registrations
  useEffect(() => {
    const handleScroll = function() {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="logo">
            <Link to="/">
              <img src={CompanyLogo} alt="Tante Dian's Magic Teas Company Logo" />
            </Link>
          </div>
          <div className="search flex">
            <AiOutlineSearch className="searchIcon" />
            <input type="text" placeholder="Search Anything..." />
          </div>
          <div className="account flexCenter">
            <button className="profile">Sign In</button>
            <Cart />
          </div>
        </div>
      </header>
    </>
  );
};