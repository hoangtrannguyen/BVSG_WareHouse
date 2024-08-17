import React from "react";
import { Card, Button } from "react-bootstrap";
import "./dataCard.css";

const DataCard = ({
  data,
  onButtonClick,
  headers,
  handleEditClick,
  handleDeleteClick,
  handleQrClick,
  showActionButtons = true,
}) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={index} className="mb-2">
          <Card.Body className="card-body">
            {headers.map((header) => (
              <div key={header.key} className="item">
                <strong>{header.label}:</strong>
                <div>{item[header.key] || ""}</div>
              </div>
            ))}
          </Card.Body>
          {showActionButtons && (
            <Card.Footer className="text-center">
              <Button
                size="sm"
                variant="info"
                onClick={() => handleEditClick(item.id)}
                style={{ marginRight: "5px", color: "white" }}
              >
                <i className="bi bi-pencil-square"> </i>
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDeleteClick(item.id)}
                style={{ marginRight: "5px" }}
              >
                <i className="bi bi-trash3"> </i>
                Delete
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleQrClick(item)}
              >
                <i className="bi bi-qr-code"> </i>
                QR Code Create
              </Button>
            </Card.Footer>
          )}
          {!showActionButtons && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onButtonClick(item)}
              className="mt-2"
            >
              Confirm
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
