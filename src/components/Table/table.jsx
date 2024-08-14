import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchData } from "../../service/Data/getData";
import PaginationComponent from "../pagination/Pagination";
import { StyledTable } from "../../styles/styledTable";
import { TABLE_HEADERS } from "../../constant/table";
import SearchBar from "../searchBar/SearchBar";
import DataCard from "../DataCard/DataCard";
import ConfirmModal from "../modal/ModalConfirm"; // Adjust the import path as needed

const DataTable = ({ isMobileView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptDate, setAcceptDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = isMobileView ? 5 : 15;
  const { data, error, isLoading } = useQuery(
    ["fetchData", searchQuery, acceptDate, currentPage, itemsPerPage],
    () => fetchData(searchQuery, acceptDate, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  const handleSearch = (query, acceptDate) => {
    const formattedDate = acceptDate.replace(/-/g, "");
    setSearchQuery(query);
    setAcceptDate(formattedDate);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setAcceptDate("");
    setCurrentPage(1);
  };

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = (formData) => {
    console.log("Confirmed action for:", formData);
    // Add your confirm logic here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPages = Math.ceil(data.responseTotal / itemsPerPage);
  const paginatedData = data.responseData;

  return (
    <div>
      <SearchBar onSearch={handleSearch} onReset={handleReset} />
      {isMobileView ? (
        <DataCard data={paginatedData} onButtonClick={handleButtonClick} />
      ) : (
        <StyledTable bordered hover>
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  {TABLE_HEADERS.map((header) => (
                    <td key={header.key}>
                      {item[header.key] || ""}
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEADERS.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      )}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={selectedItem}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default DataTable;
