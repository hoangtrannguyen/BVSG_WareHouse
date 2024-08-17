import React, { useState, useEffect } from "react";
import { Form, FormControl, Button, FloatingLabel } from "react-bootstrap";
import "./searchBar.css";

const SearchBar = ({
  searchFields,
  onSearch,
  onReset,
  onAddShelve,
  showAddShelveButton,
}) => {
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    if (Object.keys(searchQuery).length > 0) {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  const handleInputChange = (e, key) => {
    setSearchQuery((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleReset = (event) => {
    event.preventDefault();
    const resetQuery = searchFields.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {});
    setSearchQuery(resetQuery);
    onReset();
  };

  return (
    <Form onReset={handleReset} className="searchForm">
      {searchFields.map((field) => (
        <div key={field.key}>
          <Form.Label>{field.label}</Form.Label>
          <FloatingLabel label={field.label} className="floatingLabel">
            <FormControl
              type={field.key === "acceptDate" ? "date" : "text"}
              size="sm"
              placeholder={field.label}
              value={searchQuery[field.key] || ""}
              onChange={(e) => handleInputChange(e, field.key)}
              className="formControl"
            />
          </FloatingLabel>
        </div>
      ))}
      <div className="searchButton">
        <Button type="reset" variant="secondary" className="button">
          Reset
        </Button>
        {showAddShelveButton && (
          <Button variant="primary" className="ml-2" onClick={onAddShelve}>
            Add Shelve
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
