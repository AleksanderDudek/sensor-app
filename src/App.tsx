import { useEffect, useState } from 'react'

import './App.css'
import { HumanReadableSensorData, formatSimulatorToHumanReadable } from './app.utils'
import sensorData from '@assets/sensorConfig.json'
import recieverData from '@assets/receiverConfig.json'
import { Receiver } from './components'
import type { RecieverConfigDTO, RecieverConfigData, SensorConfigData, SensorConfigDto, } from './dto'
import { type SimulatorOutput, useSimulator } from './utils/hooks'
import { RecieverStatus } from './components/Receiver'

const App = () => {
  const [sensorConfigData, setSensorConfigData] =
    useState<SensorConfigDto>(sensorData)

  const [recieverConfigData, setRecieverConfigData] =
    useState<RecieverConfigDTO>(recieverData)

  // read from file if there are existing recievers

  const generatedSimulators: SimulatorOutput[] = sensorConfigData.Sensors.map((sensorConfigDataItem: SensorConfigData) => useSimulator(sensorConfigDataItem))
  const generatedRecievers: RecieverConfigData[] = recieverConfigData.Recievers;

  const startStop = (x: SimulatorOutput) => {
    x.getIntervalID() ? x.stop() : x.start()
  }

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

  const renderSimulator = (sensorSimulator: SimulatorOutput, sensorConfig: SensorConfigData) => {
    const structuredSimulatorOutputObject: HumanReadableSensorData = formatSimulatorToHumanReadable(sensorSimulator.output);

    return <>
      <h3>{structuredSimulatorOutputObject.sensorTypeName}</h3>
      <p>{sensorSimulator.output}</p>
      {/* <Receiver sensorData={sensorSimulator} sensorConfig={sensorConfig}/> */}
      <button onClick={() => startStop(sensorSimulator)}> Activate/Deactivate </button>
    </>
  }

  const onRecieverStatusUpdate = (recId: number) => {
    let tempObject: RecieverConfigDTO = {...recieverConfigData}
    //toggle activity status
    tempObject.Recievers[recId] = {...tempObject.Recievers[recId], Status: tempObject.Recievers[recId].Status == RecieverStatus.Active ? RecieverStatus.Inactive : RecieverStatus.Active }
    setRecieverConfigData(tempObject);
  }

  const renderReciever = (recieverData: RecieverConfigData) => {
    // we assume for the sake of this task that SimulatorID is also index inside sensorConfig.json array

    return <>
    {/* render component */}
    <Receiver onRecieverStatusUpdate={onRecieverStatusUpdate} recieverData={recieverData} sensorData={generatedSimulators[recieverData.SimulatorID-1]} sensorConfig={sensorConfigData.Sensors[recieverData.SimulatorID-1]}/>
    {/* button to switch active/inactive for current reciever */}
    </>
  }

  return (
    <>
      <h1> Sensor dashboard</h1>

      {/* just output simulators for sensors */}
      {generatedSimulators.length > 0 && <h2>Simulators</h2>}
      {generatedSimulators.map((simulator, index) => renderSimulator(simulator, sensorConfigData.Sensors[index]))}

      {/* just output recievers for sensors */}
      {generatedRecievers.length > 0 && <h2>Recievers</h2>}
      {generatedRecievers.map((reciever) => renderReciever(reciever))}

    </>
  )
}

export default App
