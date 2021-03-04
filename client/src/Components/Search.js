import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap'
import Suggestions from './Suggestions'
import axios from 'axios'

const API_URL = 'http://localhost:8002/api/city/'

const Search = ({ citySelection, getCityWeatherData }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const getInfo = () => {
        axios.get(API_URL + query)
            .then(({ data }) => {
                setResults(data)
            })
    }

    const selectCityIndex = (cityIndex) => {
        citySelection(results[cityIndex])
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        if (query === '') {
            setResults([])
        } else {
            getInfo()
        }
    }, [query])

    return (
        <Container>
            <Row className='justify-content-left'>
                <Col md={4}                >
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter City Name Here"
                            aria-label="City Search Field"
                            aria-describedby="basic-addon2"
                            onChange={handleInputChange}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-secondary"
                                onClick={getCityWeatherData}
                            >
                                Submit
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Suggestions
                        selectCityIndex={selectCityIndex}
                        results={results}
                    />
                </Col>

            </Row>


        </Container>

    )
}

export default Search

