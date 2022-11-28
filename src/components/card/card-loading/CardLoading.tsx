import React from "react";
import { WIDECONTEXT } from "../../../context/DesignContext";
import "./CardLoading.css";

const CardLoading = ({ designContext }: { designContext: string }) => {
  return (
    <div
      className="card-wide-loading-container"
      style={{ padding: designContext === WIDECONTEXT ? "3vw 0" : "11vw 0" }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default CardLoading;
