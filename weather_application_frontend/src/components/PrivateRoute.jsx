import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

function PrivateRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      setIsLoggedIn(false)
    }
  }, []);



  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
