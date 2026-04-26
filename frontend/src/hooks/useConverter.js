import { useState, useCallback } from 'react';
import { convertFiles as apiConvertFiles } from '../services/api';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useConverter = () => {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(90);
  const [viewState, setViewState] = useState('idle'); // idle | previewing | converting | completed
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [batchId, setBatchId] = useState(null);

  const addFiles = useCallback((newFiles) => {
    const validFiles = newFiles.map(file => ({
      id: uuidv4(),
      file,
      name: file.name,
      size: file.size,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...validFiles]);
    setViewState('previewing');
  }, []);

  const removeFile = useCallback((id) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      if (filtered.length === 0) setViewState('idle');
      return filtered;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setResults([]);
    setViewState('idle');
    setProgress(0);
    setBatchId(null);
  }, []);

  const convert = async () => {
    if (files.length === 0) return;

    setViewState('converting');
    setProgress(0);
    
    // Mark all as converting
    setFiles(prev => prev.map(f => ({ ...f, status: 'converting' })));

    try {
      const response = await apiConvertFiles(
        files.map(f => f.file),
        quality,
        (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      );

      if (response.data.success) {
        setResults(response.data.results);
        setBatchId(response.data.batchId);
        setViewState('completed');
        
        // Update file statuses
        setFiles(prev => prev.map(f => {
          const res = response.data.results.find(r => r.originalName === f.name);
          return {
            ...f,
            status: res && res.success ? 'done' : 'error'
          };
        }));

        toast.success(`Successfully converted ${response.data.results.filter(r => r.success).length} images!`);
      } else {
        throw new Error(response.data.error.message || 'Conversion failed');
      }
    } catch (error) {
      console.error(error);
      setViewState('previewing');
      setFiles(prev => prev.map(f => ({ ...f, status: 'pending' })));
      toast.error(error.message || 'Something went wrong during conversion');
    }
  };

  return {
    files,
    quality,
    setQuality,
    viewState,
    progress,
    results,
    batchId,
    addFiles,
    removeFile,
    clearAll,
    convert
  };
};
