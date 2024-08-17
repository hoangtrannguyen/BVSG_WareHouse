import React, { useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import "./QR.css"; // Import your custom CSS file

const QRCodeDisplay = ({ show, handleClose, qrCode }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDownloadQR();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const qrCodeRef = useRef(null);

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
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-sm">
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" ref={qrCodeRef}>
        <QRCode value={qrCode} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadQR}>
          Download QR Code
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeDisplay;
