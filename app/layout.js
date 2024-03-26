"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import TickerProvider from "@/context/ticker";

const Layout = ({ children }) => {
  const pathname = usePathname();
  let params = { ticker: "" };
  if (pathname.includes("/search")) {
    params.ticker = pathname.substring(pathname.lastIndexOf("/") + 1);
  }
  return (
    <html className={`${styles.layout} bootstrap`}>
      <body>
        <div id="fb-root"></div>

        <div className={styles.container}>
          <div>
            <Navbar />
            <TickerProvider params={params}>
              <div>{children}</div>
            </TickerProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;
