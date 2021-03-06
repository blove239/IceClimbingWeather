import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

const About = () => {
    return (
        <Accordion className='d-flex justify-content-center mb-4'>
            <Card
                style={{ width: '50rem' }}
            >
                <Accordion.Toggle
                    as={Card.Header} eventKey='0'
                    className='font-weight-bold mx-5 d-flex justify-content-center'
                >
                    About
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body
                        style={{ width: '50rem' }}
                        className='d-flex justify-content-center'
                    >
                        The is v0.9 of the Ice climbing weather tool. The idea is to give ice climbers
                        an easier tme to assess ice conditions. By providing hourly weather data for the past 3 days
                        climbers should be able to more easily judge the conditions of the ice. Please note this is no
                        replacement for actually going to the climb and assessing the conditions for yourself. Ice climbing is also
                        a dangerous activity. Please advise caution, and check with local authorities before climbing.
                        Later versions will include a better UI and a simple algorithm to make predictions of local ice conditions.

                    </Card.Body>
                    
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default About
