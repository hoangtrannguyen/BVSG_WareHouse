import React, { useState } from "react";
import { Form, FormControl, Button, FloatingLabel } from "react-bootstrap";
import "./searchBar.css"; // Import file CSS

const SearchBar = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setQuery("");
    onReset();
  };

  return (
    <Form onSubmit={handleSearch} onReset={handleReset} className="searchForm">
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
      <div className="searchButton">
        <Button type="submit" variant="secondary" className="button">
          Search
        </Button>
        <Button type="reset" variant="secondary" className="button">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
