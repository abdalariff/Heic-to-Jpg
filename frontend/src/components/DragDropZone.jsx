import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileUp } from 'lucide-react';

const DragDropZone = ({ onFilesAdded, disabled }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (onFilesAdded) {
      onFilesAdded(acceptedFiles);
    }
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/heic': ['.heic'],
      'image/heif': ['.heif']
    },
    disabled
  });

  return (
    <div 
      {...getRootProps()} 
      className={`upload-zone ${isDragActive ? 'border-accent bg-[var(--bg-tertiary)] scale-[1.01]' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className={`p-4 rounded-full bg-accent/10 text-accent mb-4 transition-transform ${isDragActive ? 'scale-110' : ''}`}>
        {isDragActive ? <FileUp size={32} /> : <Upload size={32} />}
      </div>
      <p className="text-lg font-medium mb-1">
        {isDragActive ? 'Drop your HEIC files here' : 'Drag & drop HEIC files here'}
      </p>
      <p className="text-[var(--text-secondary)] text-sm">
        or click to browse from your computer
      </p>
      <p className="mt-4 text-xs text-[var(--text-secondary)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-full">
        Max 20 files • Up to 50MB per file
      </p>
    </div>
  );
};

export default DragDropZone;
