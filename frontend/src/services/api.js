import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/converter';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const convertFiles = async (files, quality, onUploadProgress) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));
  formData.append('quality', quality);

  return api.post('/convert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

export const getDownloadUrl = (batchId, filename) => `${API_BASE_URL}/download/${batchId}/${filename}`;
export const getZipDownloadUrl = (batchId) => `${API_BASE_URL}/zip/${batchId}`;
export const getPreviewUrl = (batchId, filename) => `${API_BASE_URL}/preview/${batchId}/${filename}`;

export const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback to direct link if fetch fails
    window.location.href = url;
  }
};

export default api;
