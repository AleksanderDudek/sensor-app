import { normalizeValue } from '../../utils'
import { defaultSectionData } from './progress-bar.const'
import './progress-bar.css'
import { ProgressBarProps } from './progress-bar.model'

const ProgressBar = ({ customBarSettings = defaultSectionData, value = -50, barWidth = 500, minValue = -100, maxValue = 100 }: ProgressBarProps) => {
  const normalizedValue = normalizeValue(value, minValue, maxValue)

  return (
    <div
      className="progress-container"
      style={barWidth ? { width: barWidth } : {}}
    >
      <div className="progress-bar">
        {customBarSettings.map(({ background, widthMultiplier }) => (
          <div
            className="progress-bar-fill"
            style={{ background, width: widthMultiplier*barWidth }}
          />
        ))}
      </div>

      <p
        className="progress-pointer"
        style={{ left: normalizedValue*barWidth }}
      >
        ▼
      </p>
    </div>
  )
}

export default ProgressBar
