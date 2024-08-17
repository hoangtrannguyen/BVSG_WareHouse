import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";
import { useMediaQuery } from "react-responsive";
import DataTable from "../../components/Table/table";
import ConfirmModal from "../../components/modal/ModalConfirm";
import QRCodeFormModal from "../../components/addShelve/addShelveModal.jsx";
import PaginationComponent from "../../components/pagination/Pagination";
import EditModal from "../../components/editModal/EditModal.jsx";
import QRCodeDisplay from "../../components/QrCodeDis/QrCodeDis.jsx";

import {
  fetchShelveData,
  deleteShelve,
  updateShelve,
  getShelveByID,
} from "../../service/Data/getShelveData.jsx";
import { SHELVE_HEADERS, SEARCH_SHELVE } from "../../constant/table.js";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import "../Home/home.css";

const Shelve = () => {
  const isMobileView = useMediaQuery({ query: "(max-width: 500px)" });
  const [currentPage, setCurrentPage] = useState(1);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddShelveModal, setShowAddShelveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrCode, setQrCode] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = isMobileView ? 5 : 15;
  const { data, error, isLoading, refetch } = useQuery(
    ["fetchShelveData", searchQuery, currentPage, itemsPerPage],
    () => fetchShelveData(searchQuery, currentPage, itemsPerPage),
    {
      keepPreviousData: true,
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  const deleteMutation = useMutation(deleteShelve, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting shelve:", error);
    },
  });

  const updateMutation = useMutation(
    ({ id, shelveData }) => updateShelve(id, shelveData),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Error updating shelf:", error);
      },
    }
  );

  const fetchSelectedItem = async (id) => {
    try {
      const item = await getShelveByID(id);
      setSelectedItem(item.responseData);
    } catch (error) {
      console.error("Error fetching shelve details:", error);
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

  const handleEditClick = (id) => {
    fetchSelectedItem(id);
    setShowEditModal(true);
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
  const handleQrClick = (code) => {
    setQrCode(code);
    setShowQRCodeModal(true);
  };

  const handleSaveEdit = (formData) => {
    if (selectedItem && selectedItem.id) {
      updateMutation.mutate({ id: selectedItem.id, shelveData: formData });
    } else {
      console.error("No item selected for editing");
    }
  };

  const totalPages = Math.ceil(data?.responseTotal / itemsPerPage) || 0;

  return (
    <Container fluid>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <SearchBar
        searchFields={SEARCH_SHELVE}
        onSearch={handleSearch}
        onReset={handleReset}
        onAddShelve={() => setShowAddShelveModal(true)}
        showAddShelveButton={true}
      />

      <DataTable
        isMobileView={isMobileView}
        data={data?.responseData || []}
        tableHeaders={SHELVE_HEADERS}
        handleButtonClick={handleButtonClick}
        showActionColumn={true}
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
      <QRCodeFormModal
        show={showAddShelveModal}
        handleClose={() => setShowAddShelveModal(false)}
        refetch={refetch}
      />
      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        item={selectedItem}
        onSave={handleSaveEdit}
      />
      <QRCodeDisplay
        show={showQRCodeModal}
        handleClose={() => setShowQRCodeModal(false)}
        qrCode={qrCode}
      />
    </Container>
  );
};

export default Shelve;
