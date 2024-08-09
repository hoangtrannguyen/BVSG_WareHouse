import styled from "styled-components";
import { Table } from "react-bootstrap";
import "../index.scss";

export const StyledTable = styled(Table)`
  border: #cecbcb;
  & th {
    background-color: #dce3f6;
    color: var(--primary);
  }

  & tr:nth-child(even) {
    background-color: #fdfdfd;
  }

  & tr:hover {
    background-color: #f5f6f8;
  }

  & td {
    padding: 8px;
    border: 1px solid #cecbcb;
  }
`;
