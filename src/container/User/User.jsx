import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { useMediaQuery } from "react-responsive";
import DataTable from "../../components/Table/table";
import ConfirmModal from "../../components/modal/ModalConfirm";
import AddModal from "../../components/addModal/addModal.jsx";
import PaginationComponent from "../../components/pagination/Pagination";
import QRCodeDisplay from "../../components/QrCodeDis/QrCodeDis.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

import {
  fetchUserData,
  deleteUser,
  updateUser,
  addUser,
  getUserByID,
} from "../../service/Data/getUserData.jsx";
import {
  USER_HEADERS,
  SEARCH_USER,
  ADD_USER,
  UPDATE_USER,
} from "../../constant/table.js";
import "../Home/home.css";

const User = () => {
  const isMobileView = useMediaQuery({ query: "(max-width: 500px)" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const itemsPerPage = isMobileView ? 5 : 15;

  const { data, error, isLoading, refetch } = useQuery(
    ["fetchUserData", searchQuery, currentPage, itemsPerPage],
    () => fetchUserData(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const fetchSelectedItem = async (id) => {
    try {
      const item = await getUserByID(id);
      setSelectedItem(item.responseData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setShowConfirmModal(true);
  };

  const handleDeleteClick = (itemId) => {
    if (itemId) {
      deleteMutation.mutate(itemId);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const item = await fetchSelectedItem(id);
      setUserId(id);
      setSelectedItem(item);
      setIsEdit(true);
      setShowAddModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleConfirm = (formData) => {
    console.log("Confirmed action for:", formData);
  };

  const handleQrClick = (item) => {
    setQrCode(item.code);
    setSelectedItem(item);
    setShowQRCodeModal(true);
  };

  const handleModalClose = () => {
    setIsEdit(false); // Reset edit state
    setShowAddModal(false);
  };

  const totalPages = Math.ceil(data?.responseTotal / itemsPerPage) || 0;

  return (
    <Container fluid>
      {isLoading && (
        <div className="text-center mt-3">
          <Spinner animation="border" /> Loading...
        </div>
      )}
      {error && <Alert variant="danger">Error: {error.message}</Alert>}

      <SearchBar
        searchFields={SEARCH_USER}
        onSearch={handleSearch}
        onReset={handleReset}
        onAddShelve={() => setShowAddModal(true)}
        showAddShelveButton={true}
      />

      <DataTable
        isMobileView={isMobileView}
        data={data?.responseData || []}
        tableHeaders={USER_HEADERS}
        handleButtonClick={handleButtonClick}
        showAddColumn={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleQrClick={handleQrClick}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        item={selectedItem}
        onConfirm={handleConfirm}
      />

      <AddModal
        show={showAddModal}
        handleClose={handleModalClose}
        refetch={refetch}
        fields={isEdit ? UPDATE_USER : ADD_USER}
        mutationFn={isEdit ? updateUser : addUser}
        initialValues={selectedItem}
        isEditing={isEdit}
        userId={userId}
      />

      <QRCodeDisplay
        show={showQRCodeModal}
        handleClose={() => setShowQRCodeModal(false)}
        item={selectedItem}
        qrCode={qrCode}
      />
    </Container>
  );
};

export default User;
