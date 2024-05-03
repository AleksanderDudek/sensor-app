// interface vs type in TS
// Component? Use type
// Data/DTO ? Use type
// Have communication with outside API/etc.? Use INTERFACE
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