import { HumanReadableSensorData, formatSimulatorToHumanReadable } from '@/app.utils'
import './sensor.css'
import { SimulatorOutput } from '@/utils'

export type SensorProps = {
    sensorSimulator: SimulatorOutput 
}


const Sensor = ({ sensorSimulator }: SensorProps) => {
    const structuredSimulatorOutputObject: HumanReadableSensorData = formatSimulatorToHumanReadable(sensorSimulator.output);
   
    const startStop = (x: SimulatorOutput) => {
        x.getIntervalID() ? x.stop() : x.start()
      }
      
    return <div className='sensor'>
      <h3>{structuredSimulatorOutputObject.sensorTypeName}</h3>
      <p>{sensorSimulator.output}</p>
      <button onClick={() => startStop(sensorSimulator)}> Activate/Deactivate </button>
    </div>
}

export default Sensor


