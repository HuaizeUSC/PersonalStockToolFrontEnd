import React from "react";
import styles from "./WatchlistBlock.module.css";
import { removeWatchlist } from "@/api/removeWatchlist";
import { useRouter } from "next/navigation";
export default function WatchlistBlock({ data, handleRemoveParent }) {
  const router = useRouter();
  const handleRemove = async () => {
    const removeWatchlistResponse = await removeWatchlist(data.ticker);
    handleRemoveParent();
  };
  const handleClick = () => {
    router.push(`/search/${data.ticker}`);
  };
  return (
    <div className={styles.container}>
      <button className="btn btn-sm " onClick={handleRemove}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
      <div className="container m-0" onClick={handleClick}>
        <div className="row pb-3">
          <div className="col">
            <div className="fs-4">{data.ticker}</div>
            <div className="fs-6"> {data.name}</div>
          </div>
          <div className="col">
            <div className="d-flex flex-column">
              <div className={`fs-4 fw-medium ${data.change > 0 ? "text-success" : data.change == 0 ? "" : "text-danger"}`}>{data.price}</div>
              <div className={`d-flex gap-2 fs-6 fw-medium ${data.change > 0 ? "text-success" : data.change == 0 ? "" : "text-danger"}`}>
                {data.change > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 15 15">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : data.change == 0 ? (
                  <></>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 15 15">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
                <div>
                  {data.change}({data.change}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
