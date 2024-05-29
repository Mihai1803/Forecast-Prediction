import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'

import { useState } from 'react'
import userService from '../features/userService'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function RegisterForm() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    passwordAgain: '',
    email: ''
  })

  const initialUserData = {
    username: '',
    password: '',
    passwordAgain: '',
    email: ''
  }
  const { username, password, passwordAgain, email } = userData


  const onChange = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      username,
      password,
      passwordAgain,
      email
    }

    if (password !== passwordAgain) {
      console.log('Password do not match');
    } else {
      try {
        await userService.registerUser(userData)
        notifyValidRegistration()
      } catch (error) {
        notifyInvalidRegistration()
      }
    }
  }

  const notifyInvalidRegistration = () => toast.error("Registration failed")
  const notifyValidRegistration = () => {
    toast.success("Registration succesful")
    setUserData(initialUserData)
  }
  



  return (
    <section className='py-12 
                        md:py-16 
                        lg:py-24'
    >
      <ToastContainer className='mt-6' />
      <div className='flex justify-center'>
        <Avatar/>
      </div>
      <h1 className='text-center mb-6'>Register</h1>
      <form className='flex flex-col space-y-6'
            onSubmit={onSubmit}
      >
        <div className='flex justify-center'>
          <TextField id='username'
                     name='username'
                     value={username} 
                     onChange={onChange}
                     label='Username' 
                     placeholder='Enter your username' 
                     variant='outlined' 
                     className='w-6/12'
                     />
        </div>
        <div className='flex justify-center'>
          <TextField id='email'
                     name='email'
                     value={email} 
                     onChange={onChange}
                     label='Email' 
                     placeholder='Enter your email' 
                     variant='outlined'
                     className='w-6/12'
          />
        </div>
        <div className='flex justify-center'>
          <TextField id='password'
                     name='password'
                     value={password} 
                     onChange={onChange}
                     type='password'
                     label='Password' 
                     placeholder='Enter your password' 
                     variant='outlined'
                     className='w-6/12'
          />
        </div>
        <div className='flex justify-center'>
          <TextField id='passwordAgain'
                     name='passwordAgain'
                     value={passwordAgain}
                     onChange={onChange} 
                     type='password'
                     label='Re-enter password' 
                     placeholder='Enter your password again' 
                     variant='outlined'
                     className='w-6/12'
          />
        </div>
        <div className='flex justify-center pt-4'>
          <Button variant='contained' 
                  type='submit'
                  className='w-6/12' >
            Register
          </Button>
        </div>
      </form>
      <div className='flex flex-col justify-center items-center mt-4'
      >
        <Link href='/login'>Already have an account? Login</Link>
      </div>
    </section>
  )
}

export default RegisterForm