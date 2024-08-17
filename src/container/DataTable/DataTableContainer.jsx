// components/DataTable/DataTableContainer.jsx
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "../../components/Table/table";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

const DataTableContainer = ({ fetchData, tableHeaders }) => {
  const isMobileView = useMediaQuery({ query: "(max-width: 500px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = isMobileView ? 5 : 15;
  const { data, error, isLoading } = useQuery(
    ["fetchData", searchQuery, currentPage, itemsPerPage],
    () => fetchData(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  const handleSearch = (query, acceptDate) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = (formData) => {
    console.log("Confirmed action for:", formData);
  };

  const totalPages = Math.ceil(data?.responseTotal / itemsPerPage) || 0;

  return (
    <Container fluid>
      <DataTable
        isMobileView={isMobileView}
        data={data}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleButtonClick={handleButtonClick}
        handleConfirm={handleConfirm}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItem={selectedItem}
        tableHeaders={tableHeaders}
        fetchData={fetchData}
      />
    </Container>
  );
};

export default DataTableContainer;
