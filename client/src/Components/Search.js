import React, { useEffect, useState } from 'react'
import Suggestions from './Suggestions'
import axios from 'axios'

const API_URL = 'http://localhost:8002/api/city/'

const Search = ({ citySelection }) => {
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
        if (query.length > 2) {
            getInfo()
        }
    }, [query])

    return (
        <div>
            <form>
                <input
                    placeholder="Enter city name here..."
                    onChange={handleInputChange}
                />
            </form>

            <Suggestions
                selectCityIndex={selectCityIndex}
                results={results}
            />
        </div>
    )
}

export default Search

