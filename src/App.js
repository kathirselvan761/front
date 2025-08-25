// App.js
import React, { useEffect, useState } from 'react';
import Contact from './components/contact';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  // API base URL
  const API_BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:50'   // local backend test
      : 'http://103.207.14.139:50'; // server backend

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/some-route`)   // <-- un route ku maathiko
      .then(res => res.json())
      .then(apiData => {
        console.log("API Response:", apiData);
        setData(apiData);
      })
      .catch(err => console.error("Error fetching API:", err));
  }, [API_BASE_URL]);

  return (
    // <div className="container">
    //   <h1>Data from Backend:</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    //   <Contact API_BASE_URL={API_BASE_URL} />
    // </div>
  );
};

export default App;
