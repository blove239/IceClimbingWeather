import React, { useState } from 'react';
import Search from './Components/Search'
import { Alert } from 'react-bootstrap'
import axios from 'axios'
import './App.css';

const API_URL = 'http://localhost:8002/api/weather/'

function App() {
  const [selectedCity, setSelectedCity] = useState('')
  const [cityWeatherData, setCityWeatherData] = useState({})
  const [show, setShow] = useState(false);

  const setCityFromResults = (selectedCity) => {
    setSelectedCity(selectedCity)
  }

  const getCityWeatherData = () => {
    if (selectedCity === '') {
      setShow(true)
    } else {
      setShow(false)
      axios.get(API_URL + `${selectedCity.lat}-${selectedCity.lon}`)
      .then(({ data }) => {
          setCityWeatherData(data)
      })
    }
  }

  return (
    <React.Fragment>
      {show
        ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Please select a city before submitting!</Alert.Heading>
        </Alert>
        : <div></div>}
      <Search
        citySelection={setCityFromResults}
        getCityWeatherData={getCityWeatherData}
      />
    </React.Fragment>
  )
}

export default App
