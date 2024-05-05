import { useEffect, useState } from 'react'

import './App.css'
import { formatSimulatorToHumanReadable } from './app.utils'
import data from './assets/sensorConfig.json'
import { Receiver } from './components'
import { SensorConfigData, SensorConfigDto } from './dto'
import { SimulatorOutput, useSimulator } from './utils/hooks'

const App = () => {
  const [sensorConfigData, setSensorConfigData] =
    useState<SensorConfigDto>(data)

  // read from file if there are existing recievers

  // 1 simulator

  const simulator1 = useSimulator(sensorConfigData.Sensors[0])
  const simulator2 = useSimulator(sensorConfigData.Sensors[1])
  const simulator3 = useSimulator(sensorConfigData.Sensors[2])

  const startStop = (x: SimulatorOutput) => {
    x.getIntervalID() ? x.stop() : x.start()
  }

  // start simulator
  useEffect(() => {
    simulator1.start()
    simulator2.start()
    simulator3.start()

    return () => {
      simulator1.stop()
      simulator2.stop()
      simulator3.stop()
    }
  }, [])

  formatSimulatorToHumanReadable()

  const x = ({ data: [] }) => <div>Dane...</div>

  return (
    <>
      <h1> Sensor dashboard</h1>
      <div>
        {/* format val */}
        {simulator1.output}
        <button onClick={simulator1.stop}> Stop streaming simulator 1 </button>
      </div>

      <div>
        <Receiver {...sensorConfigData.Sensors[0]} />
      </div>

      <div>
        {simulator2.output}
        <button onClick={() => startStop(simulator2)}>
          {' '}
          Stop streaming simulator 2{' '}
        </button>
      </div>
      <div>
        <Receiver {...sensorConfigData.Sensors[1]} />
      </div>
      <div>
        {simulator3.output}
        <button onClick={simulator3.stop}> Stop streaming simulator 3 </button>
      </div>

      <div>
        <Receiver {...sensorConfigData.Sensors[2]} />
      </div>
    </>
  )
}

export default App
