// App.js
import React, { useEffect, useState } from 'react';
import Contact from './components/contact';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from backend API
    fetch(`${process.env.REACT_APP_API_URL}/api/some-route`)
      .then(res => res.json())
      .then(apiData => {
        console.log("API Response:", apiData);
        setData(apiData);
      })
      .catch(err => console.error("Error fetching API:", err));
  }, []);

  return (
    <div className="container">
      <h1>Data from Backend:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      {/* Your existing Contact component */}
      <Contact />
    </div>
  );
};

export default App;
