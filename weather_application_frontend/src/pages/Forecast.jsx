import React from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Navbar from '../components/Navbar'
import { Chart } from 'react-google-charts'


import { useState, useEffect } from 'react'
import dataService from '../features/dataService'




function Forecast() {

  const [country, setCountry] = useState('')
  const [maximumTemperatureData, setMaximumTemperatureData] = useState([
    ['Day', 'Maximum Temperature']
  ])
  const [minimumTemperatureData, setMinumumTemperatureData] = useState([
    ['Day', 'Minumum Temperature']
  ])
  const [humidity, setHumidity] = useState([
    ['Day', 'Humidity']
  ])

  useEffect(() => {
   const fetchForecastData = async () => {
      const location = {
        location: 'Romania'
      }
      try {
        const response = await dataService.getForecast(location)
        console.log(response.forecast[0].date);

        const newMaximumTemperatureData = [
          ['Day', 'Maximum Temperature']
        ]

        const newMinimumTemperatureData = [
          ['Day', 'Minimum Temperature']
        ]

        const newHumidity = [
          ['Day', 'Humidity']
        ]

        for (let iterator = 0; iterator < 7; iterator++) {
          const dailyMaximumTemperature = [response.forecast[iterator].date, response.forecast[iterator].maxTemperature]
          const dailyMinimumTemperature = [response.forecast[iterator].date, response.forecast[iterator].minTemperature]
          const dailyHumidity = [response.forecast[iterator].date, response.forecast[iterator].humidity]
          newMaximumTemperatureData.push(dailyMaximumTemperature)
          newMinimumTemperatureData.push(dailyMinimumTemperature)
          newHumidity.push(dailyHumidity)
        }
        setMaximumTemperatureData(newMaximumTemperatureData)
        setMinumumTemperatureData(newMinimumTemperatureData)
        setHumidity(newHumidity)
      } catch (error) {
        console.log('Could not get forecast:', error);
      }
   }

    fetchForecastData()

  }, [])



  const optionsMaximumTemperature = {
    title: 'Weekly maximum temperatures',
    curveType: 'function',
    legend: { position: 'bottom' }
  }

  const optionsMinimumTemperature = {
    title: 'Weekly minimum temperatures',
    curveType: 'function',
    legend: { position: 'bottom' }
  }

  const optionsHumidity = {
    title: 'Weekly humidity',
    curveType: 'function',
    legend: { position: 'bottom' }
  }

  const onChange = (e) => {
    setCountry(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const location = {
      location: country
    }
    try {
      const response = await dataService.getForecast(location)
      console.log(response.forecast[0].date);

      const newMaximumTemperatureData = [
        ['Day', 'Maximum Temperature']
      ]

      const newMinimumTemperatureData = [
        ['Day', 'Minimum Temperature']
      ]

      const newHumidity = [
        ['Day', 'Humidity']
      ]

      for (let iterator = 0; iterator < 7; iterator++) {
        const dailyMaximumTemperature = [response.forecast[iterator].date, response.forecast[iterator].maxTemperature]
        const dailyMinimumTemperature = [response.forecast[iterator].date, response.forecast[iterator].minTemperature]
        const dailyHumidity = [response.forecast[iterator].date, response.forecast[iterator].humidity]
        newMaximumTemperatureData.push(dailyMaximumTemperature)
        newMinimumTemperatureData.push(dailyMinimumTemperature)
        newHumidity.push(dailyHumidity)
      }
      setMaximumTemperatureData(newMaximumTemperatureData)
      setMinumumTemperatureData(newMinimumTemperatureData)
      setHumidity(newHumidity)
    } catch (error) {
      console.log('Could not get forecast:', error);
    }
  
  }

  return (
    <Container>
      <Navbar/>
      <form className='flex justify-between py-12 pb-6 h-1/4'
            onSubmit={onSubmit}
      >
        <TextField id='country'
                   name='country'
                   value={country}
                   onChange={onChange}
                   label='Country'
                   placeholder='Enter country' 
                   variant='outlined' 
        />
        <Button variant='contained'
                  type='submit' 
        >
            Get forecast
        </Button>
      </form>
      <div className='flex flex-col space-y-12 mt-5'>
        <Chart
          chartType='LineChart'
          width="100%"
          height="400px"
          data={maximumTemperatureData}
          options={optionsMaximumTemperature}
        />
        <Chart
          chartType='LineChart'
          width="100%"
          height="400px"
          data={minimumTemperatureData}
          options={optionsMinimumTemperature}
        />
        <Chart
          chartType='LineChart'
          width="100%"
          height="400px"
          data={humidity}
          options={optionsHumidity}
        />
      </div>
    </Container>
  )
}

export default Forecast