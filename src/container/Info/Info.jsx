import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "react-bootstrap";

const QRCodeForm = () => {
  const [shelveName, setShelveName] = useState("");
  const [shelveNo, setShelveNo] = useState("");
  const [qrValue, setQRValue] = useState("");
  const qrCodeRef = useRef();

  const handleGenerateQR = () => {
    const data = {
      shelveName: shelveName,
      shelveNo: shelveNo,
    };
    setQRValue(JSON.stringify(data));
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
    <div className="container mt-5">
      <h2 className="mb-4">Create QR Code</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Shelve Name:</label>
          <input
            type="text"
            className="form-control"
            value={shelveName}
            onChange={(e) => setShelveName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Shelve No:</label>
          <input
            type="text"
            className="form-control"
            value={shelveNo}
            onChange={(e) => setShelveNo(e.target.value)}
          />
        </div>
        <Button type="button" variant="primary" onClick={handleGenerateQR}>
          Generate QR Code
        </Button>
      </form>
      {qrValue && (
        <div className="mt-4 flex" ref={qrCodeRef}>
          <h3>Your QR Code:</h3>
          <QRCode value={qrValue} className="m-4 flex" />
          <Button variant="primary" className="mt-3" onClick={handleDownloadQR}>
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRCodeForm;
