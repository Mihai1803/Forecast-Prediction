import React from 'react'
import Container from '@mui/material/Container'
import Navbar from '../components/Navbar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Chart } from 'react-google-charts'

import { useState, useEffect } from 'react'
import dataService from '../features/dataService'


function PredictForecast() {
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
        let response = await dataService.getForecast(location)
        let predict_response = await dataService.predictForecast(location) 

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

          const date = new Date(response.forecast[iterator].date)
          date.setDate(date.getDate() + 7)
          const newDate = date.toISOString().split('T')[0]
        
          const dailyMaximumTemperature = [newDate, parseFloat(predict_response.predicted_max_temp[iterator])]
          const dailyMinimumTemperature = [newDate, parseFloat(predict_response.predicted_min_temp[iterator])]
          const dailyHumidity = [newDate, parseFloat(predict_response.predicted_humidity[iterator])]

          newMaximumTemperatureData.push(dailyMaximumTemperature)
          newMinimumTemperatureData.push(dailyMinimumTemperature)
          newHumidity.push(dailyHumidity)
        }
        setMaximumTemperatureData(newMaximumTemperatureData)
        setMinumumTemperatureData(newMinimumTemperatureData)
        setHumidity(newHumidity)
        
      } catch (error) {
        console.log('Could not predict forecast', error);
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
      let response = await dataService.getForecast(location)
      let predict_response = await dataService.predictForecast(location) 

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
        const date = new Date(response.forecast[iterator].date)
        date.setDate(date.getDate() + 7)
        const newDate = date.toISOString().split('T')[0]
      
        const dailyMaximumTemperature = [newDate, parseFloat(predict_response.predicted_max_temp[iterator])]
        const dailyMinimumTemperature = [newDate, parseFloat(predict_response.predicted_min_temp[iterator])]
        const dailyHumidity = [newDate, parseFloat(predict_response.predicted_humidity[iterator])]

        newMaximumTemperatureData.push(dailyMaximumTemperature)
        newMinimumTemperatureData.push(dailyMinimumTemperature)
        newHumidity.push(dailyHumidity)
      }
      setMaximumTemperatureData(newMaximumTemperatureData)
      setMinumumTemperatureData(newMinimumTemperatureData)
      setHumidity(newHumidity)
      
    } catch (error) {
      console.log('Could not predict forecast', error);
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

export default PredictForecast