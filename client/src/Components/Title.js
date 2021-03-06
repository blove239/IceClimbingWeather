import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcicles } from '@fortawesome/free-solid-svg-icons'

const Title = () => {
    return (
        <div className='d-flex justify-content-center mt-5 mb-2'>
            <h2>
            <FontAwesomeIcon
                className='mr-3'
                icon={faIcicles} />
                Ice Climbing Weather
            <span className='ml-2 font-weight-bold'>Tool</span>
            </h2>
        </div>
    )
}

export default Title
