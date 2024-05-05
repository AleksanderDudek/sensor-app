import { describe, expect, it } from 'vitest'
import { HumanReadableSensorData, QualityType, formatSimulatorToHumanReadable } from './app.utils';

describe('formatSimulatorToHumanReadable', () => {
  const correctMockInput: string = '$FIX, 3, Speed, 192, Normal*';
  const correctMockResult: HumanReadableSensorData = {
    id: 3,
    signalQualityType: QualityType.Normal,
    sensorTypeName: 'Speed',
    value: 192
  }

  it('should provide correct data', () => {

    const result = formatSimulatorToHumanReadable(correctMockInput)
    expect(result).toEqual(correctMockResult)
  })

})
