import React from "react";
import { Pagination } from "react-bootstrap";
import {
  StyledPagination,
  StyledPaginationItem,
  PaginationInfo,
} from "../../styles/styledPagination";
import "./pagination.css";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 5;
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  const startPage = Math.max(1, currentPage - halfPagesToShow);

  const adjustedStartPage = Math.max(
    1,
    Math.min(totalPages - pagesToShow + 1, startPage)
  );
  const adjustedEndPage = Math.min(
    totalPages,
    adjustedStartPage + pagesToShow - 1
  );

  return (
    <StyledPagination>
      <PaginationInfo>
        Page {currentPage} of {totalPages}
      </PaginationInfo>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="a"
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {[...Array(adjustedEndPage - adjustedStartPage + 1)].map((_, i) => {
        const page = adjustedStartPage + i;
        return (
          <StyledPaginationItem
            key={page}
            active={page === currentPage}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </StyledPaginationItem>
        );
      })}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="a"
      />
    </StyledPagination>
  );
};

export default PaginationComponent;
