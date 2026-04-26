import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { getPreviewUrl, getDownloadUrl, downloadFile } from '../services/api';

const ResultCard = ({ result, batchId }) => {
  const previewUrl = getPreviewUrl(batchId, result.convertedName);
  const downloadUrl = getDownloadUrl(batchId, result.convertedName);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-card overflow-hidden group animate-in zoom-in-95 duration-500">
      <div className="aspect-square relative bg-[var(--bg-tertiary)] flex items-center justify-center overflow-hidden">
        <img 
          src={previewUrl} 
          alt={result.convertedName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <a 
            href={previewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            title="Preview in new tab"
          >
            <ExternalLink size={20} />
          </a>
          <button 
            onClick={() => downloadFile(downloadUrl, result.convertedName)}
            className="p-2 bg-accent rounded-full text-white hover:bg-accent-hover transition-colors shadow-lg"
            title="Download JPG"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-3 border-t border-[var(--border)]">
        <p className="text-xs font-semibold truncate mb-0.5" title={result.convertedName}>
          {result.convertedName}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">
            JPG • {formatSize(result.size)}
          </span>
          <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] px-1.5 py-0.5 rounded font-bold">
            DONE
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
