import React, { useEffect, useState } from "react";
import styles from "./Newsblock.module.css";
import { Button, FormControl, Modal } from "react-bootstrap";
import { updatePortfolio } from "@/api/updatePortfolio";
import { updateMoney } from "@/api/updateMoney";
import { removeSinglePortfolio } from "@/api/removeSinglePortfolio";

export default function PortfolioBlock({ data, moneyP, handleSubmit, setMessage }) {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Buy");
  const [modalValue, setModalValue] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [money, setMoney] = useState(moneyP);
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
      let newPortfolio = data;
      newPortfolio.ticker = data.ticker;
      newPortfolio.name = data.name;
      newPortfolio.quantity += parseInt(modalValue);
      newPortfolio.totalcost += parseInt(modalValue) * data.price;
      newPortfolio.avgcost = newPortfolio.totalcost / newPortfolio.quantity;
      newPortfolio.change = newPortfolio.avgcost - data.price;
      newPortfolio.price = data.price;
      newPortfolio.marketvalue = data.price * newPortfolio.quantity;
      console.log(newPortfolio);
      const responseUpdatePortfolio = updatePortfolio(newPortfolio);
      updateMoney(money - modalValue * data.price);
      setMoney(money - modalValue * data.price);
      setMessage({ type: "success", message: `${data.ticker} bought successfully!` });
      setShow(false);
    } else {
      let newPortfolio = data;
      newPortfolio.ticker = data.ticker;
      newPortfolio.name = data.name;
      newPortfolio.quantity -= parseInt(modalValue);
      newPortfolio.totalcost -= parseInt(modalValue) * data.price;
      newPortfolio.avgcost = newPortfolio.totalcost / newPortfolio.quantity;
      newPortfolio.change = newPortfolio.avgcost - data.price;
      newPortfolio.price = data.price;
      newPortfolio.marketvalue = data.price * newPortfolio.quantity;
      if (newPortfolio.quantity <= 0) {
        removeSinglePortfolio(newPortfolio.ticker);
      } else {
        const responseUpdatePortfolio = updatePortfolio(newPortfolio);
      }
      updateMoney(money + modalValue * data.price);
      setMoney(money + modalValue * data.price);
      setMessage({ type: "success", message: `${data.ticker} sold successfully!` });
      setShow(false);
    }
    handleSubmit();
  };
  useEffect(() => {
    setPortfolio({ data });
  }, []);
  if (data.quantity <= 0) return <></>;
  return (
    <div>
      <Modal
        show={show}
        onHide={handleCloseModal}
        onShow={() => {
          setModalValue(0);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>{data.ticker}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <div className="fs-6">Current Price: {data.price}</div>
          <div className="fs-6">Money in Wallet: ${money}</div>
          <div className="d-flex gap-1">
            <div className="fs-6">Quantity:</div>
            <FormControl className="form-control-sm" type="number" min="" onChange={handleModalChange}></FormControl>
          </div>
          {modalType == "Buy" && modalValue * data.price > money && <div className="fs text-danger">Not enough money in wallet!</div>}
          {modalType == "Sell" && modalValue > data.quantity && <div className="fs text-danger">Not enough quantity in portfolio</div>}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div>Total: {(modalValue * data.price).toFixed(2)}</div>
          {(modalType === "Buy" && modalValue * data.price > money) || modalValue == 0 || (modalType === "Sell" && modalValue > portfolio.quantity) ? (
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
      <div className="d-flex flex-column border border-dark-subtle">
        <div className="d-flex gap-2 p-1 bg-light border-bottom border-dark-subtle">
          <div className="fw-semibold">{data.ticker}</div>
          <div>{data.name}</div>
        </div>
        <div className="row p-3">
          <div className="col-md-6 col-sm-12 d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="fw-semibold">Quantity:</div>
              <div className="fw-semibold">Avg. Cost/Share:</div>
              <div className="fw-semibold">Total Cost:</div>
            </div>
            <div className="d-flex flex-column fw-semibold">
              <div>{data.quantity.toFixed(2)}</div>
              <div>{data.avgcost.toFixed(2)}</div>
              <div>{data.totalcost.toFixed(2)}</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="fw-semibold">Change:</div>
              <div className="fw-semibold">Current Price:</div>
              <div className="fw-semibold">Market Value:</div>
            </div>
            <div className={`d-flex flex-column fw-semibold ${data.change.toFixed(2) > 0 ? "text-success" : data.change.toFixed(2) == 0 ? "" : "text-danger"}`}>
              <div>
                {data.change > 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 15 15">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : data.change == 0 ? (
                  <></>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 15 15">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}
                {data.change.toFixed(2)}
              </div>
              <div>{data.price.toFixed(2)}</div>
              <div>{data.marketvalue.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="d-flex p-1 gap-2 bg-light border-top border-dark-subtle ">
          <Button onClick={handleShowBuy} className="btn-sm btn-primary">
            Buy
          </Button>
          <Button onClick={handleShowSell} className="btn-sm btn-danger">
            Sell
          </Button>
        </div>
      </div>
    </div>
  );
}
