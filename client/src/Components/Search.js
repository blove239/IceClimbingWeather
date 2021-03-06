import React, { useState } from 'react'
import { Typeahead, withAsync } from 'react-bootstrap-typeahead'
import axios from 'axios'

const AsyncTypeahead = withAsync(Typeahead)

const API_URL = 'http://localhost:8002/api/city/'

const Search = ({ setCityFromSearch }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    return (
        <AsyncTypeahead
            id='city-search-field'
            isLoading={isLoading}
            useCache={false}
            filterBy={() => true}
            labelKey={option => option.city}
            onChange={selected => {
                setCityFromSearch(selected[0])
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
