"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getWatchlist } from "@/api/getWatchlist";
import Spinner from "@/components/Spinner";
import { getLatestPrice } from "@/api/getLatestPrice";
import { updateWatchlist } from "@/api/updateWatchlist";
import WatchlistBlock from "@/components/WatchlistBlock";
export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleRemove = () => {
    fetchWatchlist();
  };
  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      const watchlistResponse = await getWatchlist();
      setWatchlist(watchlistResponse.data);
      setMessage({ type: watchlistResponse.type, message: watchlistResponse.message });
    } catch (error) {
      console.error("Error fetching description", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWatchlist();
  }, []);
  return isLoading ? (
    <div className={styles.container}>
      <h2>My Watchlist</h2>
      <div className={styles.spinnerContainer}>
        <Spinner size="80px" />
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <h2>My Watchlist</h2>
      {message && message.type === "warning" && (
        <div className={`d-flex justify-content-between alert alert-warning`}>
          <div></div>
          <div>{message.message} </div>
          <div></div>
        </div>
      )}
      {watchlist && watchlist.map((item, index) => <WatchlistBlock key={index} data={item} handleRemoveParent={handleRemove} />)}
    </div>
  );
}
