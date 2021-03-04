import React, { useState } from 'react';
import Search from './Components/Search'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import './App.css';

const API_URL = 'http://localhost:8002/api/weather/'

function App() {
  const [selectedCity, setSelectedCity] = useState({})
  const [cityWeatherData, setCityWeatherData] = useState({})
  const [show, setShow] = useState(false)
  const [errorShow, setErrorShow] = useState(false)

  const setCityFromSearch = (selectedCity) => {
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
        }).catch(err => {
          setErrorShow(true)
        })
    }
  }

  return (
    <React.Fragment>
      {show
        ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>Please select a city before submitting!</p>
        </Alert>
        : <div></div>}
      {errorShow
        ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>Error connecting to server, please try again later</p>
        </Alert>
        : <div></div>}
      <Container>
        <Row>
          <Search
            setCityFromSearch={setCityFromSearch}
          />
          <Button
            onClick={getCityWeatherData}
          >
            Submit
          </Button>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default App
