import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { addShelve } from "../../service/Data/getShelveData"; // Adjust the import path

const QRCodeForm = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [column, setColumn] = useState("");
  const [layer, setLayer] = useState(0);

  // Mutation hook for the addShelve API call
  const mutation = useMutation(addShelve, {
    onSuccess: (data) => {
      console.log("Shelve added successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error adding shelve:",
        error.response ? error.response.data : error.message
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    const shelveData = {
      name: name,
      region: region,
      column: column,
      layer: layer,
    };

    // Trigger the mutation to add the shelve
    mutation.mutate(shelveData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Shelve</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Shelve Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Region:</Form.Label>
          <Form.Control
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Column:</Form.Label>
          <Form.Control
            type="text"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Layer:</Form.Label>
          <Form.Control
            type="number"
            value={layer}
            onChange={(e) => setLayer(parseInt(e.target.value))}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Shelve
        </Button>
      </form>
      {mutation.isLoading && <p>Adding shelve...</p>}
      {mutation.isSuccess && <p>Shelve added successfully!</p>}
      {mutation.isError && <p>Error adding shelve: {mutation.error.message}</p>}
    </div>
  );
};

export default QRCodeForm;
