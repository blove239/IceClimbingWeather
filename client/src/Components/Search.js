import React, { useState } from 'react'
import { Typeahead, withAsync } from 'react-bootstrap-typeahead'
import axios from 'axios'

const AsyncTypeahead = withAsync(Typeahead)

const API_URL = 'http://localhost:8002/api/city/'

const Search = ({setCityFromSearch}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [selectedCity, setSelectedCity] = useState({})

    setCityFromSearch(selectedCity)

    return (
        <AsyncTypeahead
            id='city-search-field'
            isLoading={isLoading}
            useCache={false}
            filterBy={() => true}
            searchText='Searching...'
            promptText='Enter city name.'
            labelKey={option => `${option.city}, ${option.state}`}
            onChange={selected => {
                setSelectedCity(selected[0])
            }}
            onSearch={query => {
                setIsLoading(true)
                axios.get(API_URL + `${query}`)
                    .then(({ data }) => {
                        setIsLoading(false)
                        setOptions(data)
                    })
            }}
            options={options}
        />
    )
}

export default Search
