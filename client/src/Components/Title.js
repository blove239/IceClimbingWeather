import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcicles } from '@fortawesome/free-solid-svg-icons'

const Title = () => {
    return (
        <h2 className='text-center mt-5 mb-2'>
            <FontAwesomeIcon
                className='mr-2'
                icon={faIcicles}
            />
                Ice Climbing Weather
            <span className='ml-2 font-weight-bold'>Tool</span>
        </h2>
    )
}

export default Title
