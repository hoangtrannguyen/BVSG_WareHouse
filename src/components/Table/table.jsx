import React from "react";
import { Button } from "react-bootstrap";
import { StyledTable } from "../../styles/styledTable";
import DataCard from "../dataCard/DataCard";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatArray = (arr) => {
  return arr.join(", ");
};

const DataTable = ({
  isMobileView,
  data = [],
  tableHeaders,
  handleButtonClick,
  showActionColumn = false,
  showAddColumn = false,
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
        showAddColumn={showAddColumn}
      />
    );
  }

  // Check if any item has valid location data
  const hasLocationData = data.some(
    (item) => item.shelfRegion && item.shelfColumn && item.shelfLayer
  );

  // Combine headers, conditionally including the "Location" column
  const combinedHeaders = tableHeaders
    .filter(
      (header) =>
        header.key !== "shelfRegion" &&
        header.key !== "shelfColumn" &&
        header.key !== "shelfLayer"
    )
    .concat(
      hasLocationData
        ? {
            key: "location",
            label: "Location",
            type: "text",
          }
        : []
    );

  return (
    <StyledTable bordered hover>
      <thead>
        <tr>
          {combinedHeaders.map((header) => (
            <th key={header.key} className="text-center">
              {header.label}
            </th>
          ))}
          {(showActionColumn || showAddColumn) && (
            <th className="text-center">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {combinedHeaders.map((header) => (
                <td
                  key={header.key}
                  className="text-center vertical-align-middle"
                >
                  {header.key === "location"
                    ? `${item.shelfRegion || ""} - ${
                        item.shelfColumn || ""
                      } - ${item.shelfLayer || ""}`
                    : header.type === "date"
                    ? formatDate(item[header.key])
                    : Array.isArray(item[header.key])
                    ? formatArray(item[header.key])
                    : header.key === "lockoutEnabled"
                    ? item[header.key]
                      ? "Không hoạt động"
                      : "Đang hoạt động"
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
              {showAddColumn && (
                <td className="text-center vertical-align-middle">
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleEditClick(item.userName)}
                    style={{ marginRight: "5px", color: "white" }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={
                combinedHeaders.length +
                (showActionColumn || showAddColumn ? 1 : 0)
              }
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
