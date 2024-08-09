import React from "react";
import { Card, Button } from "react-bootstrap";
import { TABLE_HEADERS } from "../../constant/table";
import "./dataCard.css";

const DataCard = ({ data, onButtonClick }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={index} className="mb-2">
          <Card.Body className="card-body">
            {TABLE_HEADERS.map((header) => (
              <div key={header.key} className="item">
                <strong>{header.label}:</strong>
                <div>{item[header.key] || ""}</div>
              </div>
            ))}
            {/* {item.storeHouse && (
    
            )} */}
          </Card.Body>
          <Button
            size="sm"
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
