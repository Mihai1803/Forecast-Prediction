import React from 'react'
import Container from '@mui/material/Container'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'


function Login() {


  
  return (
    <section className='min-h-screen bg-gradient-to-b from-blue-200 to-white'>
      <Container>
        <Navbar />
        <LoginForm />
      </Container>
    </section>
  )
}

export default Login