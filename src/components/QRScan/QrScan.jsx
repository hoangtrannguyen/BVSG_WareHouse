import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { Alert, Container } from "react-bootstrap";
import "./qrScan.css";

const QRScanner = ({ onScan, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData] = useState("SHELVE");

  const handleScan = (data) => {
    if (data) {
      try {
        if (typeof data.text === "string") {
          if (data.text.startsWith(formData)) {
            onScan(data.text);
            setErrorMessage("");
          } else {
            throw new Error(`Data does not start with ${formData}`);
          }
        } else {
          throw new Error("Scanned data is not a string");
        }
      } catch (error) {
        console.error("Error processing scanned data", error);
        setErrorMessage(`Lỗi: Mã QR không hợp lệ`);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setErrorMessage("Lỗi: Không thể quét mã QR. Vui lòng thử lại.");
  };

  return (
    <Container className="QrContainer">
      <QrReader
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
      />
      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default QRScanner;
