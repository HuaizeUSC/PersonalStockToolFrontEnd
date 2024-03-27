"use client";
import { getDescription } from "@/api/getDescription";
import Spinner from "@/components/Spinner";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { checkMarketStatus, convertTimestampToLosAngelesTime } from "@/utils/utils";
import { getLatestPrice } from "@/api/getLatestPrice";
import { getPeers } from "@/api/getPeers";
import Link from "next/link";
import { getHourlyData } from "@/api/getHourlyData";
import HourlyCharts from "@/components/HourlyChart";
import { getNews } from "@/api/getNews";
import Newsblock from "@/components/Newsblock";
import { getHistorcData } from "@/api/getHistoricData";
import Chart from "@/components/Chart";
import { time } from "highcharts";
import { getInsiderSentiment } from "@/api/getInsiderSentiment";
import { getTrends } from "@/api/getTrends";
import TrendsChart from "@/components/TrendsChart";
import { getEarnings } from "@/api/getEarnings";
import EarningsChart from "@/components/EarningsChart";
import { checkWatchlist } from "@/api/checkWatchlist";
import { updateWatchlist } from "@/api/updateWatchlist";
import { removeWatchlist } from "@/api/removeWatchlist";
import { Button, FormControl, Modal } from "react-bootstrap";
import { getMoney } from "@/api/getMoney";
import { getSinglePortfolio } from "@/api/getSinglePortfolio";
import PortfolioPage from "@/app/portfolio/page";
import { updatePortfolio } from "@/api/updatePortfolio";
import { updateMoney } from "@/api/updateMoney";
import { TickerContext } from "@/context/ticker";
import { removeSinglePortfolio } from "@/api/removeSinglePortfolio";

export default function TickerPage({ params }) {
  const { isLoading, description, latestPrice, peers, hourly, historic, trends, earnings, news, insider, watchlist, marketStatus, money, portfolio, setMoney, setLatestPrice, setWatchlist, setPortfolio } = useContext(TickerContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [marketStatus, setMarketStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");
  // const [description, setDescription] = useState(null);
  // const [latestPrice, setLatestPrice] = useState(null);
  // const [peers, setPeers] = useState(null);
  // const [hourly, setHourly] = useState(null);
  // const [historic, setHistoric] = useState(null);
  // const [news, setNews] = useState(null);
  // const [insider, setInsider] = useState(null);
  // const [trends, setTrends] = useState(null);
  // const [earnings, setEarnings] = useState(null);
  // const [watchlist, setWatchlist] = useState(null);
  // const [money, setMoney] = useState(0);
  // const [portfolio, setPortfolio] = useState(null);
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Buy");
  const [modalValue, setModalValue] = useState(0);
  const handleCloseModal = () => setShow(false);
  const handleShowBuy = () => {
    setShow(true);
    setModalType("Buy");
  };
  const handleShowSell = () => {
    setShow(true);
    setModalType("Sell");
  };
  const handleModalChange = (e) => {
    setModalValue(e.target.value);
  };
  const handleModalClick = async (e) => {
    if (modalType === "Buy") {
      let newPortfolio = portfolio;
      newPortfolio.ticker = description.ticker;
      newPortfolio.name = description.name;
      newPortfolio.quantity += parseInt(modalValue);
      newPortfolio.totalcost += parseInt(modalValue) * latestPrice.c;
      newPortfolio.avgcost = newPortfolio.totalcost / newPortfolio.quantity;
      newPortfolio.change = newPortfolio.avgcost - latestPrice.c;
      newPortfolio.price = latestPrice.c;
      newPortfolio.marketvalue = latestPrice.c * newPortfolio.quantity;
      const responseUpdatePortfolio = await updatePortfolio(newPortfolio);
      const newPortfolioResponse = await getSinglePortfolio(newPortfolio.ticker);
      setPortfolio(newPortfolioResponse.data);
      updateMoney(money - modalValue * latestPrice.c);
      setMoney(money - modalValue * latestPrice.c);
      setMessage({ type: "success", message: "Successfully buy the stock" });
      setShow(false);
    } else {
      let newPortfolio = portfolio;
      newPortfolio.ticker = description.ticker;
      newPortfolio.name = description.name;
      newPortfolio.quantity -= parseInt(modalValue);
      newPortfolio.totalcost -= parseInt(modalValue) * latestPrice.c;
      newPortfolio.avgcost = newPortfolio.totalcost / newPortfolio.quantity;
      newPortfolio.change = newPortfolio.avgcost - latestPrice.c;
      newPortfolio.price = latestPrice.c;
      newPortfolio.marketvalue = latestPrice.c * newPortfolio.quantity;
      if (newPortfolio.quantity <= 0) {
        await removeSinglePortfolio(newPortfolio.ticker);
      } else {
        const responseUpdatePortfolio = await updatePortfolio(newPortfolio);
      }
      const newPortfolioResponse = await getSinglePortfolio(newPortfolio.ticker);
      setPortfolio(newPortfolioResponse.data);
      updateMoney(money + modalValue * latestPrice.c);
      setMoney(money + modalValue * latestPrice.c);
      setMessage({ type: "success", message: "Successfully sell the stock" });
      setShow(false);
    }
  };

  // const fetchDescription = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await getDescription(params.ticker);
  //     if (response.type == "error") {
  //       setMessage({ type: "error", message: response.message });
  //       setIsLoading(false);
  //     }
  //     const priceResponse = await getLatestPrice(params.ticker);
  //     const peersResponse = await getPeers(params.ticker);
  //     const hourlyResponse = await getHourlyData(params.ticker);
  //     const historicResponse = await getHistorcData(params.ticker);
  //     const newsResponse = await getNews(params.ticker);
  //     const insiderResponse = await getInsiderSentiment(params.ticker);
  //     const trendsResponse = await getTrends(params.ticker);
  //     const earningsResponse = await getEarnings(params.ticker);
  //     const watchlistResponse = await checkWatchlist(params.ticker);
  //     const moneyResponse = await getMoney();
  //     const portfolioResponse = await getSinglePortfolio(params.ticker);
  //     setDescription(response.data);
  //     setLatestPrice(priceResponse.data);
  //     setPeers(peersResponse.data);
  //     setHourly(hourlyResponse.data.results);
  //     setNews(newsResponse.data);
  //     setHistoric(historicResponse.data.results);
  //     setInsider(insiderResponse.data);
  //     setTrends(trendsResponse.data);
  //     setEarnings(earningsResponse.data);
  //     setWatchlist(watchlistResponse.data);
  //     setMoney(moneyResponse.data.money);
  //     setPortfolio(portfolioResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching description", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   setMarketStatus(checkMarketStatus());
  //   fetchDescription();
  // }, [params]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const priceResponse = await getLatestPrice(params.ticker);
  //     setLatestPrice(priceResponse.data);
  //   };
  //   fetchData();

  //   const interval = setInterval(fetchData, 15000);
  //   return () => clearInterval(interval);
  // }, [params.ticker]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleWatchlist = async (e) => {
    e.preventDefault();
    const priceResponse = await getLatestPrice(params.ticker);
    setLatestPrice(priceResponse.data);
    console.log(watchlist);
    if (!watchlist) {
      const updateWatchlistResponse = await updateWatchlist({ ticker: description.ticker, name: description.name, price: latestPrice.c, change: latestPrice.d, percent: latestPrice.dp });
      setMessage(updateWatchlistResponse);
    } else {
      const removeWatchlistResponse = await removeWatchlist(params.ticker);
      setMessage(removeWatchlistResponse);
    }
    const watchlistResponse = await checkWatchlist(params.ticker);
    setWatchlist(watchlistResponse.data);
  };
  const handleCloseMessage = (e) => {
    e.preventDefault();
    setMessage(null);
  };
  return (
    <div>
      {message && (
        <div className={styles.container}>
          <div className="container-fluid">
            <div className={`d-flex justify-content-between alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
              <div></div>
              <div>{message.message} </div>
              <button type="button" className="btn-close" onClick={handleCloseMessage}></button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={styles.container}>
          <Spinner size="80px" />
        </div>
      )}
      {!isLoading && description && (
        <div className={styles.container}>
          <Modal
            show={show}
            onHide={handleCloseModal}
            onShow={() => {
              setModalValue(0);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <div>{description.ticker}</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column gap-2">
              <div className="fs-6">Current Price: {latestPrice.c}</div>
              <div className="fs-6">Money in Wallet: ${money.toFixed(2)}</div>
              <div className="d-flex gap-1">
                <div className="fs-6">Quantity:</div>
                <FormControl className="form-control-sm" type="number" min="" onChange={handleModalChange}></FormControl>
              </div>
              {modalType == "Buy" && modalValue * latestPrice.c > money && <div className="fs text-danger">Not enough money in wallet!</div>}
              {modalType == "Sell" && modalValue > portfolio.quantity && <div className="fs text-danger">Not enough quantity in portfolio</div>}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <div>Total: {(modalValue * latestPrice.c).toFixed(2)}</div>
              {(modalType === "Buy" && modalValue * latestPrice.c > money) || modalValue == 0 || (modalType === "Sell" && modalValue > portfolio.quantity) ? (
                <Button className="btn-sm btn-success" disabled>
                  {modalType === "Buy" ? "Buy" : "Sell"}
                </Button>
              ) : (
                <Button className="btn-sm btn-success" onClick={handleModalClick}>
                  {modalType === "Buy" ? "Buy" : "Sell"}
                </Button>
              )}
            </Modal.Footer>
          </Modal>

          <div className={styles.searchContainer}>
            <div className={styles.descriptionContainer}>
              <div className={styles.descriptionTicker}>
                <div className={styles.descriptionTickerContainer}>
                  <div>{description.ticker}</div>
                  <div onClick={handleWatchlist}>
                    {watchlist ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className={styles.starfill} viewBox="0 0 21 21">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 21 21" className={styles.star}>
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.descriptionName}>{description.name}</div>
              <div className={styles.descriptionExchange}>{description.exchange}</div>
              <div className={styles.descriptionButtonContainer}>
                <button onClick={handleShowBuy} className="btn btn-success w-4">
                  Buy
                </button>

                {portfolio && portfolio.quantity > 0 && (
                  <button onClick={handleShowSell} className="btn btn-danger w-4">
                    Sell
                  </button>
                )}
              </div>
            </div>
            <div className={styles.iconContainer}>
              <img src={description.logo} className={styles.icon} />
              <p className={marketStatus.open ? styles.iconTimeOpen : styles.iconTimeClose}>{marketStatus.message}</p>
            </div>
            <div className={`d-flex flex-column gap-3 align-items-center ${styles.changeContainer}`}>
              <div className={`fs-4 fw-medium ${latestPrice.d > 0 ? "text-success" : latestPrice.d == 0 ? "" : "text-danger"}`}>{latestPrice.c}</div>
              <div className={`d-flex gap-2 fs-6 fw-medium ${latestPrice.d > 0 ? "text-success" : latestPrice.d == 0 ? "" : "text-danger"}`}>
                {latestPrice.d > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 15 15">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : latestPrice == 0 ? (
                  <></>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 15 15">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
                <div>
                  {latestPrice.d}({latestPrice.dp}%)
                </div>
              </div>
              <div className={`text-secondary ${styles.updateTime}`}>{convertTimestampToLosAngelesTime(latestPrice.t)}</div>
            </div>
          </div>
          <div className="container mt-3">
            <ul className="nav nav-underline nav-fill" id="myTab" role="tablist">
              <li className="nav-item mr-0">
                <div onClick={() => handleTabChange("Summary")} className={`nav-link fw-semibold text-primary-emphasis ${activeTab === "Summary" && "active"} ${styles.navlink}`}>
                  Summary
                </div>
              </li>
              <li className="nav-item">
                <div onClick={() => handleTabChange("Top News")} className={`nav-link fw-semibold text-primary-emphasis ${activeTab === "Top News" && "active"} ${styles.navlink}`}>
                  Top News
                </div>
              </li>
              <li className="nav-item">
                <div onClick={() => handleTabChange("Charts")} className={`nav-link fw-semibold text-primary-emphasis ${activeTab === "Charts" && "active"} ${styles.navlink}`}>
                  Charts
                </div>
              </li>
              <li className="nav-item">
                <div onClick={() => handleTabChange("Insights")} className={`nav-link fw-semibold text-primary-emphasis ${activeTab === "Insights" && "active"} ${styles.navlink}`}>
                  Insights
                </div>
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${activeTab === "Summary" && "active"}`}>
                <div className={styles.summaryContainer}>
                  <div className={styles.summaryLeftContainer}>
                    <div className={styles.priceContainer}>
                      <p className="mb-0">
                        <span className="fw-medium">High price: </span>
                        {latestPrice.h}
                      </p>
                      <p className="mb-0">
                        <span className="fw-medium">Low price: </span>
                        {latestPrice.l}
                      </p>
                      <p className="mb-0">
                        <span className="fw-medium">Open price: </span>
                        {latestPrice.o}
                      </p>
                      <p className="mb-0">
                        <span className="fw-medium">Prev. Close: </span>
                        {latestPrice.c}
                      </p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2 mb-5">
                      <div className="fs-4 fw-medium text-decoration-underline mb-2">About the company</div>
                      <div>
                        <span className="fw-medium">IPO Start Date: </span>
                        {description.ipo}
                      </div>
                      <div>
                        <span className="fw-medium">Industry: </span>
                        {description.finnhubIndustry}
                      </div>
                      <div>
                        <span className="fw-medium">Webpage: </span>
                        <a target="_blank" href={description.weburl}>
                          {description.weburl}
                        </a>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="fw-medium">Peers: </div>
                        <div className="d-flex gap-1">
                          {peers &&
                            peers.map((peer, index) => {
                              return (
                                <Link key={index} href={`/search/${peer}`}>
                                  {peer}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>{hourly && <HourlyCharts ticker={description.ticker} data={hourly} up={latestPrice.d > 0} />}</div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === "Top News" && "active"}`}>
                <div className="container text-center">
                  <div className="row row-cols-md-2 row-cols-1">
                    {news &&
                      news.map((item, index) => {
                        return <Newsblock key={index} data={item} />;
                      })}
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === "Charts" && "active"}`}>
                <div className={styles.historicChart}>{historic && <Chart data={historic} ticker={description.ticker} />}</div>
              </div>
              <div className={`tab-pane ${activeTab === "Insights" && "active"}`}>
                {insider && (
                  <div className={`d-flex flex-column align-items-center gap-4 mb-3 ${styles.insiderContainer}`}>
                    <div className="fw-semibold fs-3">Insider Sentiments</div>
                    <table className={`table table-sm align-middle text-center ${styles.tableContainer}`}>
                      <thead>
                        <tr>
                          <th>{description.name}</th>
                          <th>MSPR</th>
                          <th>Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Total</th>
                          <td>
                            {insider.data
                              .reduce((sum, cur) => {
                                return sum + cur.mspr;
                              }, 0)
                              .toFixed(2)}
                          </td>
                          <td>
                            {insider.data.reduce((sum, cur) => {
                              return sum + cur.change;
                            }, 0)}
                          </td>
                        </tr>
                        <tr>
                          <th>Positive</th>
                          <td>
                            {insider.data
                              .reduce((sum, cur) => {
                                return cur.mspr <= 0 ? sum : sum + cur.mspr;
                              }, 0)
                              .toFixed(2)}
                          </td>
                          <td>
                            {insider.data.reduce((sum, cur) => {
                              return cur.change <= 0 ? sum : sum + cur.change;
                            }, 0)}
                          </td>
                        </tr>
                        <tr>
                          <th>Negative</th>
                          <td>
                            {insider.data
                              .reduce((sum, cur) => {
                                return cur.mspr > 0 ? sum : sum + cur.mspr;
                              }, 0)
                              .toFixed(2)}
                          </td>
                          <td>
                            {insider.data.reduce((sum, cur) => {
                              return cur.change > 0 ? sum : sum + cur.change;
                            }, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={styles.insiderChartContainer}>
                      <div className={styles.insiderChart}>{trends && <TrendsChart trends={trends} />}</div>

                      <div className={styles.insiderChart}>{earnings && <EarningsChart earnings={earnings} />}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
