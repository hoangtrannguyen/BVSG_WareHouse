import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../../service/Data/getData";
import PaginationComponent from "../pagination/Pagination";
import { StyledTable } from "../../styles/styledTable";
import { TABLE_HEADERS } from "../../constant/table";
import { Button } from "react-bootstrap";
import SearchBar from "../searchBar/SearchBar";
import DataCard from "../DataCard/DataCard";

const DataTable = ({ isMobileView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const { data, error, isLoading } = useQuery(
    ["fetchData", searchQuery, currentPage, itemsPerPage],
    () => fetchData(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleButtonClick = () => {
    console.log("Button clicked in Store House column");
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
      <SearchBar onSearch={handleSearch} onReset={handleReset}></SearchBar>
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
                      {item[header.key] || "N/A"}
                      {header.key === "storeHouse" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={handleButtonClick}
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
    </div>
  );
};

export default DataTable;
