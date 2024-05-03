export type SensorConfigData = {
  EncoderType: string
  Frequency: number
  ID: number
  MaxValue: number
  MinValue: number
  Type: string
}

export type SensorConfigDto = {
  Sensors: SensorConfigData[]
}