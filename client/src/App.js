import React, { useState } from 'react';
import Search from './Components/Search'
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('')

  const setCityFromResults = (selectedCity) => {
    setSelectedCity(selectedCity)
  }

  return (
    <React.Fragment>
      <div>HELLO</div>
      <Search 
        citySelection={setCityFromResults}
      />
    </React.Fragment>
  )
}

export default App
