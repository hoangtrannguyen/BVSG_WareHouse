import QrReader from "react-qr-scanner";
import "./qrScan.css";

const QRScanner = ({ onScan, onClose }) => {
  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text);
        onScan(parsedData.shelveNo);
      } catch (error) {
        console.error("Failed to parse JSON", error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="QrContainer">
      <QrReader
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
      />
    </div>
  );
};

export default QRScanner;
