import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  const onClick = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setTimeout(() => {
      navigate('/')
    }, 0)
  }

  return (
    <nav className='pt-12'>
    <ul className='flex flex-col items-center space-y-6 
                   lg:flex-row lg:justify-between lg:space-y-0'
    >
        <div>
          <li className='text-3xl'>
            <Link to="/" className='hover:text-yellow-500'>FORWEATHER</Link>
          </li>
        </div>
        <div className='flex flex-col justify-center items-center space-y-1 text-center
                        md:flex-row md:space-y-0 md:space-x-24 md:text-base'
        >
          <li>
            <Link to="/forecast" className='hover:text-yellow-500'>Forecast</Link>
          </li>
          <li>
            <Link to="/forecast_predict" className='hover:text-yellow-500'>Predict Forecast</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link onClick={onClick} className='hover:text-yellow-500'>Logout</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" className='hover:text-yellow-500'>Register</Link>
              </li>
              <li>
                <Link to="/login" className='hover:text-yellow-500'>Login</Link>
              </li>
            </>
          )}
        </div>
        <div className='hidden lg:block'>
          <img src={icon} alt='User Icon' className='w-8 h-8' />
        </div>
    </ul>
  </nav>
  )
}

export default Navbar