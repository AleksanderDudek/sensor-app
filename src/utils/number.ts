export const normalizeValue = (val: number, min: number, max: number) => {
  if (min > max) {
    const temp = max
    max = min
    min = temp
  }

  if (min === max) {
    return min
  }

  return (val - min) / (max - min)
}
