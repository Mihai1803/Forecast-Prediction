import axios from 'axios'


const USER_API_URL = process.env.REACT_APP_USER_API_URL

const registerUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(USER_API_URL + 'register/', userData, config)
  return response.data
}

const loginUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(USER_API_URL + 'login/', userData, config)

  const token = response.data.token
  localStorage.setItem('token', JSON.stringify(token))

  return response.data

}




const userService = {
  registerUser,
  loginUser
}

export default userService