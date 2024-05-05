import { HumanReadableSensorData, formatSimulatorToHumanReadable } from '@/app.utils'
import { ProgressBar } from './ProgressBar'
import { SimulatorOutput } from '@/utils'
import { RecieverConfigData, SensorConfigData } from '@/dto'

export type ReceiverProps = {
  sensorConfig: SensorConfigData;
  sensorData: SimulatorOutput;
  recieverData: RecieverConfigData;
  onRecieverStatusUpdate: (recId: number) => void
}

export enum RecieverStatus {
  Active = 'active',
  Inactive = 'inactive'
}

const Receiver = ({ sensorData, sensorConfig, recieverData, onRecieverStatusUpdate }: ReceiverProps) => {
  // TODO: Inactive state - shadow, etc.
  const extractedTelegram: HumanReadableSensorData = formatSimulatorToHumanReadable(sensorData.output);

  // TODO: Idle state - if value hasn't changed for given time trigger some warning

  return <>
    <p>Reciever ID: {recieverData.ID} getting data from sensor ID: {recieverData.SimulatorID}</p>
    <p>Status: {recieverData.Status}</p>    
    <button onClick={() => onRecieverStatusUpdate(recieverData.ID - 1)}>{recieverData.Status == RecieverStatus.Active ? 'Deactivate' : 'Activate'}</button>
    {recieverData.Status == RecieverStatus.Inactive ? <p>Please check your connection</p> :
      <ProgressBar value={extractedTelegram.value} minValue={sensorConfig.MinValue} maxValue={sensorConfig.MaxValue} />
    }
  </>
}

export default Receiver
