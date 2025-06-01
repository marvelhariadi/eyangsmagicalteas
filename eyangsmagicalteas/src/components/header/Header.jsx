// import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import CompanyLogo from "../../assets/images/CompanyLogo.svg";

import { Cart } from "./Cart";

export const Header = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });

  return (
    <>
      <header className="header" style={{ padding: '10px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="logo" style={{ flex: '0 0 auto' }}>
            <NavLink to="/">
              {/* <h1>Eyang's Magical Teas</h1> */}
              <img src={CompanyLogo} alt="Eyang's Magical Teas Company Logo" />
            </NavLink>
          </div>
          <div className="search" style={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', maxWidth: '500px', margin: '0 20px' }}>
            <AiOutlineSearch className="searchIcon" />
            <input type="text" placeholder="Peruse Our Teas" name="" id="" />
          </div>
          <div className="account" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <button className="profile">Sign In</button>
            {/* <Cart />  */}
          </div>
        </div>
      </header>
    </>
  );

  // return (
  //   <>
  //     <div className="header-container">
  //      <h1>Eyang's magic teas</h1>
  //      <img src={CompanyLogo} alt="Eyang's Magic Teas Company Logo" />

  //   </div>
  //   </>
  // );

};