import React, { useState } from 'react'
import { Typeahead, withAsync } from 'react-bootstrap-typeahead'
import axios from 'axios'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const AsyncTypeahead = withAsync(Typeahead)

const API_URL = process.env.REACT_APP_CITY_SEARCH

const Search = ({ setCityFromSearch }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    const handleSearch = (query) => {
        setIsLoading(true)
        axios.get(API_URL + `${query}`)
            .then(({ data }) => {
                setIsLoading(false)
                setOptions(data)
            }).catch(err => {
                console.log(err)
                setIsLoading(true)
            })
    }

    return (
        <AsyncTypeahead
            placeHolder='Enter city name...'
            filterBy={() => true}
            id='city-search-field'
            isLoading={isLoading}
            labelKey={'city'}
            useCache={false}
            onChange={selected => {
                setCityFromSearch(selected[0])
            }}
            onSearch={handleSearch}
            options={options}
        />
    )
}

export default Search
