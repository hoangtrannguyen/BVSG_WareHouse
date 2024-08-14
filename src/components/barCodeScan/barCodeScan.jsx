import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button, Container } from "react-bootstrap";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [hasWebcam, setHasWebcam] = useState(true);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const hasCamera = devices.some((device) => device.kind === "videoinput");
      setHasWebcam(hasCamera);
    });
  }, []);

  return (
    <div>
      {!hasWebcam ? (
        <p>
          Không tìm thấy webcam. Vui lòng kết nối webcam để sử dụng tính năng
          này.
        </p>
      ) : (
        <>
          <Button
            onClick={() => setIsWebcamOn(true)}
            className="mx-3
           my-3"
          >
            Bật Webcam
          </Button>
          <Button
            onClick={() => setIsWebcamOn(false)}
            className="mx-3
           my-3"
          >
            Tắt Webcam
          </Button>

          {isWebcamOn && (
            <div
              style={{ position: "relative", width: "100%", height: "auto" }}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                style={{ width: "100%", height: "auto" }}
                onError={(error) => console.error("Webcam error:", error)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WebcamComponent;
