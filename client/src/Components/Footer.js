import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='d-flex justify-content-center mt-5'>
      <a href='https://github.com/blove239/IceClimbingWeather'>
        <FontAwesomeIcon icon={faGithub} />
      </a>{' '}
      / Made by {' '}
      <a href="http://brandonlove.ca">Brandon Love.</a>
    </div>
  )
}

export default Footer
