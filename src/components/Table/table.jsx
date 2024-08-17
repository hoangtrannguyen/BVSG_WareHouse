import React from "react";
import { Button } from "react-bootstrap";
import { StyledTable } from "../../styles/styledTable";
import DataCard from "../dataCard/DataCard";

const DataTable = ({
  isMobileView,
  data = [],
  tableHeaders,
  handleButtonClick,
  showActionColumn = false,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
  handleQrClick = () => {},
}) => {
  return isMobileView ? (
    <DataCard
      data={data}
      onButtonClick={handleButtonClick}
      headers={tableHeaders}
    />
  ) : (
    <StyledTable bordered hover>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
          {showActionColumn && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {tableHeaders.map((header) => (
                <td key={header.key}>
                  {item[header.key] || ""}{" "}
                  {header.key === "storeHouse" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleButtonClick(item)}
                      style={{ float: "right" }}
                    >
                      Confirm
                    </Button>
                  )}
                </td>
              ))}

              {showActionColumn && (
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleEditClick(item.id)}
                    style={{ marginRight: "5px", color: "white" }}
                  >
                    <i class="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    <i class="bi bi-trash3"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleQrClick(item.code)}
                  >
                    <i class="bi bi-qr-code"></i>
                  </Button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={tableHeaders.length + (showActionColumn ? 1 : 0)}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default DataTable;
