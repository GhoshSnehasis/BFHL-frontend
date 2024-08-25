// src/BFHLForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

import './BFHLForm.css'; // Import custom CSS

function BFHLForm() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData); // Parse JSON to validate
      console.log(parsedData);
      const res = await axios.post('https://66cad957d4764d734acdf24e--dreamy-cucurucho-006d43.netlify.app/bfhl',  parsedData );
   
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON or server error');
      console.log(err)
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected.map(option => option.value));
  };

  const getFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    return filteredResponse;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">BFHL Challenge</h1>
      <div className="card shadow-lg p-4 bg-light">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="jsonInput">Enter JSON Data:</label>
            <textarea
              id="jsonInput"
              className="form-control"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='Enter JSON'
              rows='4'
              required
            />
          </div>
          <button type='submit' className="btn btn-primary mt-3">Submit</button>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            <p>{error}</p>
          </div>
        )}

        {response && (
          <>
            <Select
              isMulti
              options={[
                { value: 'Alphabets', label: 'Alphabets' },
                { value: 'Numbers', label: 'Numbers' },
                { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
              ]}
              onChange={handleSelectChange}
              placeholder="Select options to display"
              className="mb-3"
            />

            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Filtered Response</h4>
              <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BFHLForm;
