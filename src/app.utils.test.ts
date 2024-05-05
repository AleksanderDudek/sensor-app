import { describe, expect, it } from 'vitest'

// describe('getRange', () => {
//   it('handles undefined range', () => {
//     const undefRange = undefined

//     const result = getRange(undefRange)
//     expect(result).toEqual('-')
//   })

//   it('handles empty range', () => {
//     const emptyRange: RangeValue = {}

//     const result = getRange(emptyRange)
//     expect(result).toEqual('-')
//   })

//   it('returns correct result on no min value in range', () => {
//     const onlyMaxRange: RangeValue = { max: 3.87 }

//     const result = getRange(onlyMaxRange)
//     expect(result).toEqual(`<${onlyMaxRange.max}`)
//   })

//   it('returns correct result on no max value in range', () => {
//     const onlyMinRange: RangeValue = { min: 3.87 }

//     const result = getRange(onlyMinRange)
//     expect(result).toEqual(`>${onlyMinRange.min}`)
//   })

//   it('returns correct result with all values in range', () => {
//     const fullRange: RangeValue = { min: 3.87, max: 10.32 }

//     const result = getRange(fullRange)
//     expect(result).toEqual(`${fullRange.min} - ${fullRange.max}`)
//   })

//   it('returns correct result when min is equal to max', () => {
//     const minMaxEqualRange: RangeValue = { min: 3.87, max: 3.87 }

//     const result = getRange(minMaxEqualRange)
//     expect(result).toEqual(`${minMaxEqualRange.min}`)
//   })
// })
