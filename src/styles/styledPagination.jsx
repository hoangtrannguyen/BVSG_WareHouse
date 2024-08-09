import styled from "styled-components";
import { Pagination } from "react-bootstrap";
import "../index.scss";

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 0.8rem;
    .page-link {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

export const StyledPaginationItem = styled(Pagination.Item)`
  width: 3rem;
  height: fit-content;
  text-align: center;

  .page-link {
    color: var(--dark);
    border-radius: 5px;
  }

  &.active .page-link {
    color: var(--light) !important;
    background-color: var(--primary) !important;
  }

  &.disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
