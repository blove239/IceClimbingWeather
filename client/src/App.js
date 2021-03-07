import React, { useState } from 'react'
import About from './Components/About'
import CurrentWeather from './Components/CurrentWeather'
import Footer from './Components/Footer'
import LineChart from './Components/LineChart'
import Search from './Components/Search'
import Title from './Components/Title'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:8002/api/weather/'

function App() {
  const [selectedCity, setSelectedCity] = useState({})
  const [hourlyWeatherData, setHourlyWeatherData] = useState([])
  const [currentWeatherData, setCurrentWeatherData] = useState([])
  const [errorShow, setErrorShow] = useState(false)

  const setCityFromSearch = (selectedCity) => {
    setSelectedCity(selectedCity)
  }

  const getCityWeatherData = () => {
    if (!selectedCity) {
      setHourlyWeatherData([])
      setCurrentWeatherData([])
    } else {
      axios.get(API_URL + `${selectedCity.lat}-${selectedCity.lon}`)
        .then(({ data }) => {
          setErrorShow(false)
          setHourlyWeatherData(data.hourly)
          setCurrentWeatherData(data.current)
        }).catch(err => {
          setErrorShow(true)
        })
    }
  }

  return (
    <React.Fragment>
      <Title />
      <About />
      {errorShow
        ? <Alert variant='danger' onClose={() => setErrorShow(false)} dismissible>
          <p>Error connecting to server, please try again later</p>
        </Alert>
        : <></>}
      <Container>
        <Row className='d-flex justify-content-center mb-4'>
          <Search
            className='mr-2'
            setCityFromSearch={setCityFromSearch} />
          <Button
            className='ml-2'
            onClick={getCityWeatherData}>
            Get Results
          </Button>
        </Row>
        <Row>
          <Col className='col-md-9'>
            <LineChart hourlyWeather={hourlyWeatherData} />
          </Col>
          <Col className='col-md-3'>
            <CurrentWeather currentWeatherData={currentWeatherData} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default App
