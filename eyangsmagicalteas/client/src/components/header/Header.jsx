import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

import { Cart } from "./Cart";

export const Header = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  
  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to search page with search term as query parameter
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="header" style={{ padding: '10px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="logo" style={{ flex: '0 0 auto' }}>
            <NavLink to="/">
              <img src="/images/CompanyLogo.svg" alt="Eyang's Magical Teas Company Logo" />
            </NavLink>
          </div>
          
          {/* Desktop Search - Hidden on Mobile */}
          {!isMobile && (
            <form className="search" style={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', maxWidth: '500px', margin: '0 20px' }} onSubmit={handleSearchSubmit}>
              <AiOutlineSearch className="searchIcon" onClick={handleSearchSubmit} style={{ cursor: 'pointer' }} />
              <input 
                type="text" 
                placeholder="Peruse Our Teas" 
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search products"
              />
            </form>
          )}
          
          {/* Desktop Best Sellers Link - Hidden on Mobile */}
          {!isMobile && (
            <NavLink 
              to="/category/best-sellers" 
              className="best-sellers-link"
              style={{ 
                textDecoration: 'none', 
                color: '#000', 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 'normal',
                marginRight: '15px'
              }}
            >
              Best Sellers
            </NavLink>
          )}
          
          {/* Mobile Header Right Section */}
          <div className="mobile-header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Shopping Cart - Always Visible */}
            <div className="cart-wrapper" style={{ position: 'relative' }}>
              <Cart />
            </div>
            
            {/* Mobile Menu Toggle Button */}
            {isMobile && (
              <button 
                className="mobile-menu-toggle" 
                onClick={toggleMobileMenu}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px'
                }}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            )}
            
            {/* Desktop Admin Button - Hidden on Mobile */}
            {!isMobile && (
              <NavLink to="/admin">
                <button className="profile">Admin</button>
              </NavLink>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="mobile-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            zIndex: 100,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '15px'
          }}>
            <form className="mobile-search" style={{ marginBottom: '15px' }} onSubmit={handleSearchSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '6px', padding: '0 10px' }}>
                <AiOutlineSearch style={{ cursor: 'pointer' }} onClick={handleSearchSubmit} />
                <input 
                  type="text" 
                  placeholder="Peruse Our Teas" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ flex: 1, border: 'none', padding: '10px', outline: 'none' }}
                  aria-label="Search products"
                />
              </div>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#000', padding: '10px 0', borderBottom: '1px solid #eee' }}>Home</NavLink>
              <NavLink to="/category/best-sellers" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#000', padding: '10px 0', borderBottom: '1px solid #eee', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Best Sellers</NavLink>
              <NavLink to="/category/tea-leaves" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#000', padding: '10px 0', borderBottom: '1px solid #eee' }}>Magic Tea Leaves</NavLink>
              <NavLink to="/category/tea-pots" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#000', padding: '10px 0', borderBottom: '1px solid #eee' }}>Tea Pots</NavLink>
              <NavLink to="/category/tea-bags" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#000', padding: '10px 0', borderBottom: '1px solid #eee' }}>Magic Tea Bags</NavLink>
              <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <button className="profile" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Admin</button>
              </NavLink>
            </div>
          </div>
        )}
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