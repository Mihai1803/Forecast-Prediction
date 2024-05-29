import axios from 'axios'

const FORECAST_API_URL = process.env.REACT_APP_FORECAST_API_URL
const FORECAST_PREDICT_API_URL = process.env.REACT_APP_FORECAST_PREDICT_API_URL

const getForecast = async (country) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(FORECAST_API_URL, country, config);
  return response.data
}

const predictForecast = async (country) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(FORECAST_PREDICT_API_URL , country, config);
  return response.data
} 


const dataService = {
  getForecast,
  predictForecast
}

export default dataService