import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, FloatingLabel } from "react-bootstrap";
import "./searchBar.css";

const SearchBar = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");
  const [acceptDate, setAcceptDate] = useState("");

  useEffect(() => {
    if (query || acceptDate) {
      onSearch(query, acceptDate);
    }
  }, [query, acceptDate, onSearch]);

  const handleReset = (event) => {
    event.preventDefault();
    setQuery("");
    setAcceptDate("");
    onReset();
  };

  return (
    <Form onReset={handleReset} className="searchForm">
      <Form.Label>Accept No:</Form.Label>
      <FloatingLabel label="Accept No" className="floatingLabel">
        <FormControl
          type="text"
          size="sm"
          placeholder="Accept No"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="formControl"
        />
      </FloatingLabel>
      <Form.Label>Accept Date:</Form.Label>
      <FloatingLabel label="Accept Date" className="floatingLabel">
        <FormControl
          type="date"
          size="sm"
          placeholder="Accept Date"
          value={acceptDate}
          onChange={(e) => setAcceptDate(e.target.value)}
          className="formControl"
        />
      </FloatingLabel>
      <div className="searchButton">
        <Button type="reset" variant="secondary" className="button">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
