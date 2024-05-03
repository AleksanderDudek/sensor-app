import { useState } from 'react'
import reactLogo from './assets/react.svg'
import data from './assets/sensorConfig.json'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [sensorConfigData, setSensorConfigData] = useState<SensorConfigDto>(data)

  const createSim = (sensor: SensorConfigData) => {

  }

  const X = () => {
    sensorConfigData.Sensors.map((sensor: SensorConfigData) => createSim(sensor))
  }

  return (
    <>
      <h1> Sensor dashboard</h1>
    </>
  )
}

export default App
