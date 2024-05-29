import React from 'react'
import Container from '@mui/material/Container'

import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'

function Register() {
  return (
    <section className='min-h-screen bg-gradient-to-b from-blue-200 to-white'>
      <Container>
        <Navbar />
        <RegisterForm />
      </Container>
    </section>
  )
}

export default Register