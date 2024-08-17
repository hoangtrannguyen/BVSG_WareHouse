import React from "react";
import { Button } from "react-bootstrap";
import { StyledTable } from "../../styles/styledTable";
import DataCard from "../dataCard/DataCard";

// Function to format date to dd/mm/yyyy
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // Return empty if the date is invalid
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
  if (isMobileView) {
    return (
      <DataCard
        data={data}
        onButtonClick={handleButtonClick}
        headers={tableHeaders}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleQrClick={handleQrClick}
        showActionButtons={showActionColumn}
      />
    );
  }

  return (
    <StyledTable bordered hover>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header.key} className="text-center">
              {header.label}
            </th>
          ))}
          {showActionColumn && <th className="text-center">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {tableHeaders.map((header) => (
                <td
                  key={header.key}
                  className="text-center vertical-align-middle"
                >
                  {header.type === "date"
                    ? formatDate(item[header.key])
                    : item[header.key] || ""}
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
                <td className="text-center vertical-align-middle">
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleEditClick(item.id)}
                    style={{ marginRight: "5px", color: "white" }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(item.id)}
                    style={{ marginRight: "5px" }}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleQrClick(item)}
                  >
                    <i className="bi bi-qr-code"></i>
                  </Button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={tableHeaders.length + (showActionColumn ? 1 : 0)}
              className="text-center vertical-align-middle"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default DataTable;
