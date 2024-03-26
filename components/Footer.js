import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={`bg-secondary-subtle d-flex justify-content-center align-items-center`}>
      <p className="fw-semibold mb-0">
        Powered by <a href="https://finnhub.io">Finnhub.io</a>{" "}
      </p>
    </footer>
  );
};

export default Footer;
