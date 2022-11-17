import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";

import "./Layout.css";

const Layout = ({ children }: any) => {
  return (
    <div className="layout-container ">
      <Navbar />
      <Header />
      <div className="layout-main">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
