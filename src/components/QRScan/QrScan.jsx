import QrReader from "react-qr-scanner";

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
    <div>
      <div>
        <QrReader
          onError={handleError}
          onScan={handleScan}
          style={{ width: "50%", height: "50%" }}
        />
      </div>
    </div>
  );
};

export default QRScanner;
