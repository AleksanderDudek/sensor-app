export type ProgressBarSectionData = {
  background: string
  width: number
}

export type ProgressBarProps = {
  value: number
  sectionsData?: ProgressBarSectionData[]
  width?: number
}
