import { HumanReadableSensorData, QualityType, formatSimulatorToHumanReadable } from '@/app.utils'
import { ProgressBar } from '../ProgressBar'
import { SimulatorOutput } from '@/utils'
import { RecieverConfigData, SensorConfigData } from '@/dto'
import './reciever.css'

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
  const renderStatusMessage = () => {
    switch (extractedTelegram.signalQualityType) {
      case QualityType.Alarm:
        return <p className='reciever-message reciever-message-alarm'>{extractedTelegram.value} is {extractedTelegram.signalQualityType} value!!!</p>
      case QualityType.Normal:
        return <p className='reciever-message reciever-message-normal'>{extractedTelegram.value} is {extractedTelegram.signalQualityType} value</p>
      case QualityType.Warning:
        return <p className='reciever-message reciever-message-warning'>{extractedTelegram.value} is {extractedTelegram.signalQualityType} value!</p>
      default:
        return <p> {extractedTelegram.signalQualityType} value!</p>
    }
  }

  return <div className='reciever'>
    <p>Reciever ID: {recieverData.ID} getting data from sensor ID: {recieverData.SimulatorID}</p>
    <p>Status: {recieverData.Status}</p>
    <button onClick={() => onRecieverStatusUpdate(recieverData.ID - 1)}>{recieverData.Status == RecieverStatus.Active ? 'Deactivate' : 'Activate'}</button>
    {recieverData.Status == RecieverStatus.Active &&
      renderStatusMessage()
    }
    {recieverData.Status == RecieverStatus.Inactive ? <p>Please check your connection</p> :
      <ProgressBar value={extractedTelegram.value} minValue={sensorConfig.MinValue} maxValue={sensorConfig.MaxValue} />
    }
  </div>
}

export default Receiver
