import React from 'react'
import Container from '@mui/material/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

import Navbar from '../components/Navbar'

function Landing() {

  const sectionStyle = {
    backgroundImage: 'repeating-linear-gradient(315deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px,transparent 2px, transparent 4px),linear-gradient(315deg, rgba(158,237,255, 0.5),rgb(112,141,230))',
    minHeight: '100vh'
  }

  return (
    <section style={sectionStyle}>
      <Container>
        <Navbar/>
        <div className='text-center mt-32
                        md:mt-52'
        >
          <h1 className='text-bold text-5xl py-4
                         md:text-8xl'
          >
            FORWEATHER
          </h1>
          <h4 className='text-sm
                         md:text-lg
                         lg:text-xl'
          >
            Get the latest weather foreacasts and predictions
          </h4>
          <FontAwesomeIcon icon={faSun} className='text-8xl pt-8 text-yellow-500' /> 
        </div>
      </Container>
    </section>
  )
}

export default Landing