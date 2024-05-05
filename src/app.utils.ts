// this part should be mentioned during task talk
// enum EncoderType {
//     Fixed = 'fixed',
// }

enum QualityType {
  Alarm = 'Alarm',
  Normal = 'Normal',
  Warning = 'Warning',
}

export type HumanReadableSensorData = {
  id: number
  sensorTypeName: string
  value: number
  signalQualityType: QualityType
}

export const formatSimulatorToHumanReadable = (
  simulatorTelegram: string = '$FIX, 3, Speed, 192, Normal*',
): HumanReadableSensorData => {
//   if (simulatorTelegram[0] != '$' || simulatorTelegram[-1] != '*')
//     throw 'Format of the telegram is incorrect'

  const splitStringArray = simulatorTelegram
    .slice(0)
    .replace(/\s/g, '')
    .replace(/[\*\$]/g, '')
    .split(',')

  const humanReadableData: HumanReadableSensorData = {
    id: Number(splitStringArray[1]),
    sensorTypeName: splitStringArray[2],
    value: Number(splitStringArray[3]),
    signalQualityType:
      QualityType[splitStringArray[4] as keyof typeof QualityType],
  }

  return humanReadableData
}
