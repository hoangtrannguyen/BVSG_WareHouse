import React from "react";
import { Card, Button } from "react-bootstrap";
import "./dataCard.css";

const DataCard = ({ data, onButtonClick, headers }) => {
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
          <Button
            size="m"
            variant="secondary"
            onClick={() => onButtonClick(item)}
            className="mt-2"
          >
            Confirm
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
