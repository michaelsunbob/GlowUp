import React from 'react';
import "./NavigationBar.css"

export const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="item-title">GlowUp</li>
        <li className="item">Routines</li>
        <li className="item">Products</li>
        <li className="item">Recommendations</li>
        <li className="item-profile-icon">
          <img src="profile-icon.png"
               alt="Profile Icon"
               className="profile-icon-img"
          />
        </li>
      </ul>
    </nav>
  );
};



