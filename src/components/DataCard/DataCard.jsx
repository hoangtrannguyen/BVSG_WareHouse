import React from "react";
import { Card, Button } from "react-bootstrap";
import { TABLE_HEADERS } from "../../constant/table";

const DataCard = ({ data, onButtonClick }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            {TABLE_HEADERS.map((header) => (
              <div key={header.key}>
                <strong>{header.label}:</strong> {item[header.key] || "N/A"}
              </div>
            ))}
            {item.storeHouse && (
              <Button
                size="sm"
                variant="secondary"
                onClick={onButtonClick}
                className="mt-2"
              >
                Confirm
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
