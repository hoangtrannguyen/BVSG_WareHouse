import React, { useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import printJS from "print-js";
import "./QR.css";
const QRCodeDisplay = ({ show, handleClose, qrCode, item }) => {
  const qrCodeRef = useRef(null);

  const handlePrintQR = () => {
    const svgData = new XMLSerializer().serializeToString(
      qrCodeRef.current.querySelector("svg")
    );

    const additionalText = item
      ? `
      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 48px; font-weight: bold;">
          ${item.region}-${item.column}-${item.layer}
        </p>
        <p style="font-size: 48px; font-weight: bold;">
          ${item.name}
        </p>
      </div>
    `
      : "";

    printJS({
      printable: `
        <div class="print-container">
          ${svgData}
          ${additionalText}
        </div>
      `,
      type: "raw-html",
      style: `
        @page {
          size: A5;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
        }
        .print-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        svg {
          max-width: 100%;
          max-height: 100%;
        }
        p {
          font-size: 48px;
          margin: 10px 0;
          font-weight: bold;
        }
      `,
      header: "QR Code",
    });
  };

  const handleDownloadQR = () => {
    const svg = qrCodeRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const imgURI = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const a = document.createElement("a");
      a.href = imgURI;
      a.download = "QRCode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = url;
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-sm">
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" ref={qrCodeRef}>
        <QRCode value={qrCode} />
        {item && (
          <div
            className="item-text"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <p>
              {item.region} - {item.column} - {item.layer}
            </p>
            <p>{item.name}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadQR}>
          Download QR Code
        </Button>
        <Button variant="primary" onClick={handlePrintQR}>
          Print QR Code
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeDisplay;
