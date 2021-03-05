import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <a 
      className='mr-1 text-dark'
      href='https://github.com/blove239/IceClimbingWeather'>
        <FontAwesomeIcon icon={faGithub} />
        {' '}
      </a>
      / Made by {' '}
      <a 
      className='ml-1 text-dark'
      href='https://brandonlove.ca'>Brandon Love.</a>
    </div>
  )
}

export default Footer
