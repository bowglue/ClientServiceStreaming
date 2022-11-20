import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-image">
        <img style={{ width: "100%" }} src="./focus6.webp" alt="Movie" />
        <div className="header-vignette"></div>
        <div className="header-gradient"></div>
        <div className="header-card-container"></div>
      </div>
    </div>
  );
};

export default Header;
