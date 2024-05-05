import { normalizeValue } from '../../utils';
import { ProgressBarProps } from './progress-bar.model';
import { defaultSectionData } from './progress-bar.const';
import './progress-bar.css'

const ProgressBar = ({ value, sectionsData, width }: ProgressBarProps) => {
  const data = sectionsData ?? defaultSectionData

  return (
    <div className="progress-container" style={width ? { width: `${width}px`} : {}}>
      <div className="progress-bar">
        {data.map(({background, width}) => (
          <div 
            className="progress-bar-fill" 
            style={{ background, width: `${normalizeValue(width, 0, 100)}%` }} 
          />
        ))}
      </div>

      <p className="progress-pointer" style={{ left: `${normalizeValue(value, 0, 100)}%` }}>
        ▼
      </p>
    </div>
  );
};

export default ProgressBar;
