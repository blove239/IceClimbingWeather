import React, { useState } from 'react'
import CurrentWeather from './Components/CurrentWeather'
import LineChart from './Components/LineChart'
import Search from './Components/Search'
import { Alert, Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:8002/api/weather/'

function App() {
  const [selectedCity, setSelectedCity] = useState({})
  const [hourlyWeatherData, setHourlyWeatherData] = useState([])
  const [currentWeatherData, setCurrentWeatherData] = useState([])
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
          setHourlyWeatherData(data.hourly)
          setCurrentWeatherData(data.current)
        }).catch(err => {
          setErrorShow(true)
        })
    }
  }

  return (
    <React.Fragment>
      <h1
        className='d-flex justify-content-center'
      >
        Simple Historical Weather Tool
      </h1>

      {show
        ? <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          <p>Please select a city before submitting!</p>
        </Alert>
        : <div></div>}
      {errorShow
        ? <Alert variant='danger' onClose={() => setShow(false)} dismissible>
          <p>Error connecting to server, please try again later</p>
        </Alert>
        : <div></div>}
      <Container>
        <Row
          className='d-flex justify-content-center'
        >
          <Search
            setCityFromSearch={setCityFromSearch}
          />
          <Button
            onClick={getCityWeatherData}
          >
            Submit
          </Button>
        </Row>
        <Row>
          <Col
            className='col-9'
          >
            <LineChart
              hourlyWeather={hourlyWeatherData}
            />
          </Col>
          <Col
            className='col-3'
          >
            <CurrentWeather
              currentWeatherData={currentWeatherData}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default App
