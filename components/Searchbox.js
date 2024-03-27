"use client";
import React, { useEffect, useState } from "react";
import styles from "./Searchbox.module.css";
import { getAutoComplete } from "@/api/getAutoComplete";
import Spinner from "./Spinner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

let timeout;
const Searchbox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [autoComplete, setAutoComplete] = useState([]);
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    setMessage("");
    if (e) {
      e.preventDefault(); // 阻止默认的表单提交行为
    }
    setIsShowing(false);
    if (inputValue === "") {
      router.push("/search/home");
      setMessage("Please enter a valid ticker");
    } else {
      router.push(`/search/${inputValue}`);
    }
  };

  const handleLink = (ticker) => {
    setInputValue(ticker);
    setIsShowing(false);
    router.push(`/search/${ticker}`);
  };
  const handleClose = (e) => {
    e.preventDefault();
    router.push(`/search/home`);
    setInputValue("");
    setIsShowing(false);
  };
  const handleChange = async (e) => {
    clearTimeout(timeout);
    const value = e.target.value;
    setInputValue(value.toUpperCase());
    timeout = setTimeout(async () => {
      setIsShowing(true);
      if (value === "") setIsShowing(false);
      setIsLoading(true);
      try {
        const autoCompleteList = await getAutoComplete(value);
        setAutoComplete(autoCompleteList.data);
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
      setIsLoading(false);
    }, 500);
  };
  const handleCloseMessage = (e) => {
    e.preventDefault();
    setMessage(null);
  };
  useEffect(() => {
    const Ticker = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (Ticker != "home") {
      setInputValue(Ticker);
    }
  }, [pathname]);
  return (
    <div className={styles.container}>
      <h1 className="fs-2 my-4 fw-normal">STOCK SEARCH</h1>
      <form className={`d-flex justify-content-between align-items-center ${styles.search_container}`} onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" className={styles.input_search} name="search" id="search" placeholder="Enter Stock Ticker Symbol" value={inputValue} />
        <div className={`${styles.icon_container}`}>
          <button className={`btn btn-sm ${styles.btn}`} onClick={(e) => handleSubmit(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icon} viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
          <button className={`btn btn-sm ${styles.btn}`} onClick={(e) => handleClose(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </form>
      {isShowing && (
        <div className={styles.autocompleteContainer}>
          <div className={styles.autocompleteContent} style={{ maxHeight: `150px` }}>
            {isLoading && (
              <ul className={styles.autocompleteList}>
                {" "}
                <Spinner size="20px" />
              </ul>
            )}
            {!isLoading && autoComplete && autoComplete.length > 0 && (
              <ul className={styles.autocompleteList}>
                {autoComplete.map((item, index) => (
                  <li key={index} className={styles.autocompleteItem} onClick={() => handleLink(item.symbol)}>
                    {item.symbol} | {item.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {message && (
        <div className="container-fluid mt-3">
          <div className="d-flex justify-content-between alert  alert-danger">
            <div></div>
            <div>{message} </div>
            <button type="button" className="btn-close" onClick={handleCloseMessage}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbox;
