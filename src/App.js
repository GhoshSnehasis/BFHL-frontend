// src/App.js
import React from 'react';
import BFHLForm from './BFHLForm';

function App() {
  React.useEffect(() => {
    document.title = "your_roll_number"; // Replace with your actual roll number
  }, []);

  return (
    <div className="App">
      <BFHLForm />
    </div>
  );
}

export default App;
