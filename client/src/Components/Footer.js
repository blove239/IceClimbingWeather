import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <>
      <div className='d-flex justify-content-center small mt-5'>
        Inspired by
        <a
          className='ml-1 text-dark'
          href='https://www.petzl.com/CA/en/Sport/Waterfall-ice-study?ActivityName=Ice-climbing'>Petzl Waterfall Ice Study.</a>
      </div>
      <div className='d-flex justify-content-center'>
        <a
          className='mr-1 text-dark'
          href='https://github.com/blove239/IceClimbingWeather'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      / Made by
      <a
          className='ml-1 text-dark'
          href='https://brandonlove.ca'>Brandon Love.</a>
      </div>
    </>
  )
}

export default Footer
