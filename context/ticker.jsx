"use client";
import { getDescription } from "@/api/getDescription";
import Spinner from "@/components/Spinner";
import { createContext, useEffect, useMemo, useState } from "react";
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

export const TickerContext = createContext();

const TickerProvider = ({ children, params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null);
  const [peers, setPeers] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [historic, setHistoric] = useState(null);
  const [news, setNews] = useState(null);
  const [insider, setInsider] = useState(null);
  const [trends, setTrends] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [money, setMoney] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);
  const fetchDescription = async () => {
    try {
      setIsLoading(true);
      const response = await getDescription(params.ticker);
      if (response.type == "error") {
        setMessage({ type: "error", message: response.message });
        setIsLoading(false);
      }
      const priceResponse = await getLatestPrice(params.ticker);
      const peersResponse = await getPeers(params.ticker);
      const hourlyResponse = await getHourlyData(params.ticker);
      const historicResponse = await getHistorcData(params.ticker);
      const newsResponse = await getNews(params.ticker);
      const insiderResponse = await getInsiderSentiment(params.ticker);
      const trendsResponse = await getTrends(params.ticker);
      const earningsResponse = await getEarnings(params.ticker);
      const watchlistResponse = await checkWatchlist(params.ticker);
      const moneyResponse = await getMoney();
      const portfolioResponse = await getSinglePortfolio(params.ticker);
      setDescription(response.data);
      setLatestPrice(priceResponse.data);
      setPeers(peersResponse.data);
      setHourly(hourlyResponse.data.results);
      setNews(newsResponse.data);
      setHistoric(historicResponse.data.results);
      setInsider(insiderResponse.data);
      setTrends(trendsResponse.data);
      setEarnings(earningsResponse.data);
      setWatchlist(watchlistResponse.data);
      setMoney(moneyResponse.data.money);
      setPortfolio(portfolioResponse.data);
    } catch (error) {
      console.error("Error fetching description", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!description || (params.ticker && params.ticker != description.ticker)) {
      console.log("ticker refresh", description);
      setMarketStatus(checkMarketStatus());
      fetchDescription();
    }
  }, [params.ticker]);
  useEffect(() => {
    const fetchData = async () => {
      if (!description || (params.ticker && params.ticker != description.ticker)) {
        const priceResponse = await getLatestPrice(params.ticker);
        setLatestPrice(priceResponse.data);
      }
    };
    fetchData();

    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [params.ticker]);
  const contextValue = {
    isLoading,
    description,
    latestPrice,
    peers,
    hourly,
    historic,
    trends,
    earnings,
    news,
    insider,
    watchlist,
    marketStatus,
    money,
    portfolio,
    setMoney,
    setLatestPrice,
    setWatchlist,
    setPortfolio,
  };
  return <TickerContext.Provider value={contextValue}>{children}</TickerContext.Provider>;
};

export default TickerProvider;
