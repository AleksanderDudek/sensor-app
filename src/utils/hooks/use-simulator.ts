import { useRef, useState } from 'react'

import { SensorConfigData } from '../../dto'

enum QualityType {
  Alarm = 'Alarm',
  Normal = 'Normal',
  Warning = 'Warning',
}

export type SimulatorOutput = {
  output: string
  getIntervalID: () => number | null
  start: (freqeuncy?: number) => void
  stop: () => void
}

export const useSimulator = (
  data: Partial<SensorConfigData>,
): SimulatorOutput => {
  // let encoderType: string = ''
  let frequencyHz: number = 0
  let id: number = 0
  let maxValue: number = 0
  let minValue: number = 0
  let sensorTypeName: string = ''

  const intervalID = useRef<number | null>(null)
  const [outputSignal, setOutputSignal] = useState('')

  const assessQuality = (sensorValue: number) => {
    const rangeOfValues = maxValue - minValue

    const normalizedValue = (sensorValue - minValue) / rangeOfValues

    const isOfAlarmQuality = (val: number) => val <= 0.1 || val >= 0.9
    const isOfNormalQuality = (val: number) => val < 0.75 && val > 0.25
    const isOfWarningQuality = (val: number) =>
      (val > 0.1 && val <= 0.25) || (val < 0.9 && val >= 0.75)

    switch (true) {
      case isOfAlarmQuality(normalizedValue):
        return QualityType.Alarm
      case isOfNormalQuality(normalizedValue):
        return QualityType.Normal
      case isOfWarningQuality(normalizedValue):
        return QualityType.Warning
      default:
        break
    }
  }

  const formatCurrentSensorResponse = (sensorVal: number) => {
    return `${'$FIX'}, ${id}, ${sensorTypeName}, ${sensorVal}, ${assessQuality(sensorVal)}`
  }

  const generateRandomValue = (): number => {
    const randomVal = Math.floor(Math.random() * maxValue + minValue)
    return randomVal
  }

  const mapSensorConfigDataToSimulator = () => {
    // encoderType = data.EncoderType ?? ''
    frequencyHz = data.Frequency ?? 0
    id = data.ID ?? 0
    maxValue = data.MaxValue ?? 0
    minValue = data.MinValue ?? 0
    sensorTypeName = data.Type ?? ''
  }

  const startSignalGeneration = (inputfrequency?: number) => {
    const signalFrequency = inputfrequency ?? frequencyHz

    if (intervalID.current) {
        return
    }

    const id = setInterval(() => {
      const newValue = generateRandomValue()
      setOutputSignal(formatCurrentSensorResponse(newValue))
    }, signalFrequency * 1000)

    intervalID.current = Number(id)
  }

  const stopSignalGeneration = () => {
    if (!intervalID.current) return

    clearInterval(intervalID.current)
    intervalID.current = null
  }

  const getIntervalID = () => {
    return intervalID.current
  }

  // IFEE 'constructor'
  mapSensorConfigDataToSimulator()

  return {
    output: outputSignal,
    start: startSignalGeneration,
    stop: stopSignalGeneration,
    getIntervalID,
  }
}
