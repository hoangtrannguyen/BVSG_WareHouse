import styled from "styled-components";
import { Pagination } from "react-bootstrap";
import "../index.scss";
export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  .page-link {
    border-radius: 5px;
    color: var(--dark);
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
`;

export const PaginationInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;
