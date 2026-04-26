import React from 'react';

const QualitySlider = ({ value, onChange, disabled }) => {
  return (
    <div className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold text-sm">JPG Quality</h3>
        <p className="text-xs text-[var(--text-secondary)]">Higher quality results in larger file sizes</p>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto min-w-[200px]">
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-accent disabled:opacity-50"
        />
        <span className="font-mono text-sm bg-accent/10 text-accent px-2 py-1 rounded min-w-[40px] text-center">
          {value}%
        </span>
      </div>
    </div>
  );
};

export default QualitySlider;
