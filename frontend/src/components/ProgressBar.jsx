import React from 'react';

const ProgressBar = ({ progress, label }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          {label || 'Conversion Progress'}
        </span>
        <span className="text-xs font-bold text-accent">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
