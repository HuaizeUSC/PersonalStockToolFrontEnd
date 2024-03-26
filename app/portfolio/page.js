"use client";
import React, { Component, useEffect, useState } from "react";
import styles from "./page.module.css";
import Spinner from "@/components/Spinner";
import { getPortfolios } from "@/api/getPortfolios";
import { updatePortfolio } from "@/api/updatePortfolio";
import PortfolioBlock from "@/components/PortfolioBlock";
import { getMoney } from "@/api/getMoney";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [money, setMoney] = useState(0);
  const [update, setUpdate] = useState(0);

  const handleSoldout = () => {
    fetchPortfolios();
    setUpdate(update + 1);
  };
  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      const portfoliosResponse = await getPortfolios();
      const moneyResponse = await getMoney();
      setPortfolios(portfoliosResponse.data);
      setMoney(moneyResponse.data.money);
    } catch (error) {
      console.error("Error fetching portfolios", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseMessage = (e) => {
    e.preventDefault();
    setMessage(null);
  };
  useEffect(() => {
    fetchPortfolios();
  }, []);
  return isLoading ? (
    <div className={styles.container}>
      <h2>My Portfolio</h2>
      <div className={styles.spinnerContainer}>
        <Spinner size="80px" />
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <h2>My Portfolio</h2>
      <div className="fw-semibold">Money in wallet: ${money.toFixed(2)}</div>
      {message && (
        <div className="container-fluid">
          <div className={`d-flex justify-content-between alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
            <div></div>
            <div>{message.message} </div>
            <button type="button" className="btn-close" onClick={handleCloseMessage}></button>
          </div>
        </div>
      )}
      {(!portfolios || portfolios.length === 0) && (
        <div className={`d-flex justify-content-between alert alert-warning`}>
          <div></div>
          <div>Currently you don't have any stock. </div>
          <div></div>
        </div>
      )}

      {portfolios && portfolios.map((item, index) => <PortfolioBlock key={index} data={item} moneyP={money} handleSubmit={handleSoldout} setMessage={setMessage} />)}
    </div>
  );
}
