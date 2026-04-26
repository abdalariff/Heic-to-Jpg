import React from 'react';
import { X, FileImage } from 'lucide-react';

const FilePreviewCard = ({ file, onRemove, status }) => {
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-card p-3 flex items-center justify-between group animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="bg-[var(--bg-tertiary)] p-2 rounded-lg text-accent">
          <FileImage size={24} />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate max-w-[150px] md:max-w-[200px]" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            {formatSize(file.size)}
          </p>
        </div>
      </div>

      {status === 'pending' && (
        <button 
          onClick={onRemove}
          className="p-1.5 rounded-full hover:bg-red-500/10 hover:text-red-500 text-[var(--text-secondary)] transition-colors"
          aria-label="Remove file"
        >
          <X size={18} />
        </button>
      )}
      
      {status === 'converting' && (
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-accent">Processing</span>
        </div>
      )}
      
      {status === 'done' && (
        <div className="text-[#10B981]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-500">
          <X size={20} strokeWidth={3} />
        </div>
      )}
    </div>
  );
};

export default FilePreviewCard;
