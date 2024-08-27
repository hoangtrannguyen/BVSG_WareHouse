import React, { useState } from "react";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { useMediaQuery } from "react-responsive";
import DataTable from "../../components/Table/table";
import ConfirmModal from "../../components/modal/ModalConfirm";
import PaginationComponent from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import { fetchData } from "../../service/Data/getData";
import { TABLE_HEADERS, SEARCH } from "../../constant/table.js";
import { addShelveItem } from "../../service/Data/getShelveItem.jsx";
import "./home.css";

const Home = () => {
  const isMobileView = useMediaQuery({ query: "(max-width: 500px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(""); // Thông báo thành công hoặc lỗi
  const [toastVariant, setToastVariant] = useState(""); // Loại thông báo
  const [showToast, setShowToast] = useState(false); // Trạng thái hiển thị toast

  const itemsPerPage = isMobileView ? 5 : 15;
  const { data, error, isLoading, refetch } = useQuery(
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

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = (formData) => {
    mutation.mutate(formData);
  };

  const mutation = useMutation(addShelveItem, {
    onSuccess: (data) => {
      setToastMessage("Shelve item added successfully!");
      setToastVariant("success");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000); // Tự động ẩn sau 2 giây
      refetch();
    },
    onError: (error) => {
      setToastMessage("Error adding shelve item ");
      setToastVariant("danger");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000); // Tự động ẩn sau 2 giây
    },
  });

  const totalPages = Math.ceil(data?.responseTotal / itemsPerPage) || 0;

  return (
    <Container fluid>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <SearchBar
        searchFields={SEARCH}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <DataTable
        isMobileView={isMobileView}
        data={data?.responseData || []}
        tableHeaders={TABLE_HEADERS}
        handleButtonClick={handleButtonClick}
      />
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        item={selectedItem}
        onConfirm={handleConfirm}
      />
    </Container>
  );
};

export default Home;
