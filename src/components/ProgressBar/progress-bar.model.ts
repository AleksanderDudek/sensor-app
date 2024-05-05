export type ProgressBarConfig = {
  background: string
  widthMultiplier: number
}

export type ProgressBarProps = {
  value: number
  barWidth?: number
  minValue: number
  maxValue: number
  customBarSettings?: ProgressBarConfig[]
}
