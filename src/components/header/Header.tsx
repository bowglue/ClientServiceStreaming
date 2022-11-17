import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <img className="header-image" src="./focus12.webp" alt="Movie" />
      <div className="header-vignette"></div>
      <div className="header-gradient"></div>
    </div>
  );
};

export default Header;
