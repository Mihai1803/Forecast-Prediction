import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../features/userService'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginForm() {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = userData
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  



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
      password
    }

    try {
      const response = await userService.loginUser(userData)
      if (response) {
        if (rememberMe === true) {
          const user = {
            username: response.user.username,
            password: response.user.password
          }
          localStorage.setItem('user', JSON.stringify(user))
          navigate('/')
        }
        navigate('/')
      } else {
        notifyInvalidCredentials()
      }
    } catch (error) {
        notifyInvalidCredentials()
    }

  }

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const notifyInvalidCredentials = () => toast.error("Invalid credentials")


  return (
    <section className='py-12 
                        md:py-16 
                        lg:py-24'
    >
      <ToastContainer className='mt-6' />
      <div className='flex justify-center'>
        <Avatar/>
      </div>
      <h1 className='text-center mb-6'>Login</h1>
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
          <FormControlLabel control={<Checkbox 
                                       checked={rememberMe}
                                       onChange={handleCheckboxChange}
                                    />} 
                            label='Remember me' 
                            className='w-6/12 pl-1'
                            labelPlacement='end'
                            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className='flex justify-center'>
          <Button variant='contained'
                  type='submit' 
                  className='w-6/12'
          >
            Login
          </Button>
        </div>
      </form>
      <div className='flex flex-col justify-center items-center mt-4'
      >
        <Link href='#'>Forgot password?</Link>
        <Link href='/register'>Don't have an account? Register</Link>
      </div>
    </section>
  )
}

export default LoginForm