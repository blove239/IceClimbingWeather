import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'



const Suggestions = ({ results, selectCityIndex }) => {

    const alertClicked = (e) => {
        selectCityIndex(e.target.attributes[0].value)
    }

    const options = results.map((r, i) => (
        <ListGroup.Item
            action
            eventKey={i}
            key={i}
            onClick={alertClicked}
        >
            {r.city}, {r.state}
        </ListGroup.Item>
    ))
    return <ListGroup>{options}</ListGroup>
}

export default Suggestions
