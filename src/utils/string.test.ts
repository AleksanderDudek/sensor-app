import { describe, expect, it } from 'vitest'
import { capitalize } from './string';

describe('capitalize', () => {
  const correctMockInput: string = 'normal';
  const correctMockResult: string = 'Normal';

  it('should provide correct output', () => {
    const result = capitalize(correctMockInput)
    expect(result).toEqual(correctMockResult)
  })

})
