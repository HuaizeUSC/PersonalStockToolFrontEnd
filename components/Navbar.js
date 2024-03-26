"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [searchPath, setSearchPath] = useState("/search/home");
  const [isCollapsed, setCollapsed] = useState(true);
  useEffect(() => {
    if (pathname.includes("search")) setSearchPath(pathname);
  }, [pathname]);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <nav className={`navbar navbar-expand-md navbar-dark ${styles.nav}`}>
      <div className="container-fluid">
        <div className="navbar-brand px-5">Stock Search</div>
        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded={!isCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${isCollapsed ? "collapse" : ""}`} id="navbarSupportedContent">
          <ul className={`navbar-nav ms-auto px-4`}>
            <li className={`nav-item px-2 ${pathname.includes("/search") ? styles.active : styles.normal}`}>
              <Link href={searchPath} prefetch className={`nav-link ${styles.item}`}>
                Search
              </Link>
            </li>
            <li className={`nav-item px-2 ${pathname === "/watchlist" ? styles.active : styles.normal}`}>
              <Link href="/watchlist" className={`nav-link ${styles.item}`}>
                Watchlist
              </Link>
            </li>
            <li className={`nav-item px-2 ${pathname === "/portfolio" ? styles.active : styles.normal}`}>
              <Link href="/portfolio" className={`nav-link ${styles.item}`}>
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
