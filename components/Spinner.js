import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner({ size = "80px" }) {
  return (
    <div className={styles.lds_ring} style={{ "--ring-size": size }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
