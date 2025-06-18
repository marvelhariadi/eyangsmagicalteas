import React from "react";

export const Footer = () => {
  // Hardcoded footer data
  const footerData = {
    social: [
      { id: 1, name: "Facebook", link: "#" },
      { id: 2, name: "Twitter", link: "#" },
      { id: 3, name: "Instagram", link: "#" },
      { id: 4, name: "YouTube", link: "#" }
    ],
    contact: [
      { id: 1, value: "info@eyangsmagicalteas.com", link: "mailto:info@eyangsmagicalteas.com" },
      { id: 2, value: "+1 (123) 456-7890", link: "tel:+11234567890" },
      { id: 3, value: "123 Tea Lane, Magical City", link: "#" }
    ],
    brand: [
      { id: 1, name: "Our Story", link: "#" },
      { id: 2, name: "Tea Blog", link: "#" },
      { id: 3, name: "Careers", link: "#" },
      { id: 4, name: "Press", link: "#" }
    ],
    support: [
      { id: 1, name: "FAQ", link: "#" },
      { id: 2, name: "Shipping & Returns", link: "#" },
      { id: 3, name: "Contact Us", link: "#" },
      { id: 4, name: "Tea Brewing Guide", link: "#" }
    ],
    shop: [
      { id: 1, name: "Privacy Policy", link: "#" },
      { id: 2, name: "Terms of Service", link: "#" },
      { id: 3, name: "Shipping Policy", link: "#" },
      { id: 4, name: "Refund Policy", link: "#" }
    ]
  };
  
  return (
    <>
      <footer>
        <div className="container">
          <ul>
            <h3>Social</h3>
            {footerData.social.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <ul>
            <h3>Contact</h3>
            {footerData.contact.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.value}</a>
              </li>
            ))}
          </ul>
          <ul>
            <h3>About</h3>
            {footerData.brand.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <ul>
            <h3>Customer Care</h3>
            {footerData.support.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <ul>
            <h3>Our Information</h3>
            {footerData.shop.map((item) => (
              <li key={item.id}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};