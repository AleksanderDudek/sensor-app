import { useEffect, useState } from 'react'

import './App.css'
import sensorData from '@assets/sensorConfig.json'
import recieverData from '@assets/receiverConfig.json'
import { Receiver } from './components'
import type { RecieverConfigDTO, RecieverConfigData, SensorConfigData, SensorConfigDto, } from './dto'
import { type SimulatorOutput, useSimulator } from './utils/hooks'
import { RecieverStatus } from './components/Reciever/Receiver'
import Sensor from './components/Sensor/Sensor'

const App = () => {
  const [sensorConfigData, ] =
    useState<SensorConfigDto>(sensorData)

  const [recieverConfigData, setRecieverConfigData] =
    useState<RecieverConfigDTO>(recieverData)

  // read from file if there are existing recievers

  const generatedSimulators: SimulatorOutput[] = sensorConfigData.Sensors.map((sensorConfigDataItem: SensorConfigData) => useSimulator(sensorConfigDataItem))
  const generatedRecievers: RecieverConfigData[] = recieverConfigData.Recievers;

  // start simulator
  useEffect(() => {
    generatedSimulators.map((sensorSimulator: SimulatorOutput) => {
      sensorSimulator.start()
    })

    return () => {
      // clean up function
      generatedSimulators.map((sensorSimulator: SimulatorOutput) => {
        sensorSimulator.stop()
      })
    }
  }, [])

  const renderSimulator = (sensorSimulator: SimulatorOutput) => 
    <Sensor sensorSimulator={sensorSimulator}/>

  // we assume for the sake of this task that SimulatorID is also index inside sensorConfig.json array
  const onRecieverStatusUpdate = (recId: number) => {
    let tempObject: RecieverConfigDTO = { ...recieverConfigData }
    //toggle activity status
    tempObject.Recievers[recId] = { ...tempObject.Recievers[recId], Status: tempObject.Recievers[recId].Status == RecieverStatus.Active ? RecieverStatus.Inactive : RecieverStatus.Active }
    setRecieverConfigData(tempObject);
  }

  const renderReciever = (recieverData: RecieverConfigData) =>
    <Receiver
      onRecieverStatusUpdate={onRecieverStatusUpdate}
      recieverData={recieverData}
      sensorData={generatedSimulators[recieverData.SimulatorID - 1]}
      sensorConfig={sensorConfigData.Sensors[recieverData.SimulatorID - 1]}
    />



  return (
    <>
      <h1> Sensor dashboard</h1>

      {/* just output simulators for sensors */}
      {generatedSimulators.length > 0 && <h2>Simulators</h2>}
      {generatedSimulators.map((simulator) => renderSimulator(simulator))}

      {/* just output recievers for sensors */}
      {generatedRecievers.length > 0 && <h2>Recievers</h2>}
      {generatedRecievers.map((reciever) => renderReciever(reciever))}

    </>
  )
}

export default App
