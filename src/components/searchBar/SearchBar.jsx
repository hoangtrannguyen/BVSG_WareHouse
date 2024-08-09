import React, { useState } from "react";
import { Form, FormControl, Button, FloatingLabel } from "react-bootstrap";

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
    <Form
      onSubmit={handleSearch}
      onReset={handleReset}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "2rem",
        width: "80%",
        padding: "1rem",
      }}
    >
      <Form.Label style={{}}>Accept No:</Form.Label>
      <FloatingLabel label="Accept No" style={{ width: "50vw", color: "gray" }}>
        <FormControl
          type="text"
          size="sm"
          placeholder="Accept No"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "50vw" }}
        />
      </FloatingLabel>
      <Button
        type="submit"
        variant="secondary"
        style={{ whiteSpace: "nowrap" }}
      >
        Search
      </Button>
      <Button type="reset" variant="secondary" style={{ whiteSpace: "nowrap" }}>
        Reset
      </Button>
    </Form>
  );
};

export default SearchBar;
