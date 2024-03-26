import React, { useState } from "react";
import styles from "./Newsblock.module.css";
import { Button, Modal } from "react-bootstrap";
import { convertTimestampToLosAngelesTime, convertTimestampToString } from "@/utils/utils";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "next-share";

export default function Newsblock({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>{data.source}</div>
            <div className="fs-6 text-secondary">{convertTimestampToString(data.datetime)}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <div className="fs-4 fw-semibold">{data.headline}</div>
          <div className="fs-5">{data.summary}</div>
          <div className="fs-6 text-secondary fw-semibold">
            For more details click{" "}
            <a target="_blank" href={data.url}>
              here
            </a>
          </div>
          <div className="px-3 py-2 border rounded">
            <div className="fw-semibold mb-2">Share</div>
            <div className="d-flex gap-2">
              <TwitterShareButton url={data.url} title={data.headline} blankTarget={true}>
                <TwitterIcon size={50} />
              </TwitterShareButton>
              <FacebookShareButton url={data.url} quote={data.headline} blankTarget={true}>
                <FacebookIcon size={50} />
              </FacebookShareButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className={styles.newsContainer} onClick={handleShow}>
        <img className={styles.image} src={data.image} />
        <div className={styles.newsTitle}>{data.headline}</div>
      </div>
    </div>
  );
}
