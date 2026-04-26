import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Download, RefreshCw, Trash2, ArrowRight, Zap } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DragDropZone from './components/DragDropZone';
import FilePreviewCard from './components/FilePreviewCard';
import QualitySlider from './components/QualitySlider';
import ProgressBar from './components/ProgressBar';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';
import { useConverter } from './hooks/useConverter';
import { getZipDownloadUrl, downloadFile } from './services/api';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const {
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
  } = useConverter();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent/30">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Toaster position="top-center" richColors closeButton />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6">
        <HeroSection />

        <div className="space-y-8 max-w-4xl mx-auto pb-12">
          {/* Step 1: Upload */}
          <div className={`transition-all duration-500 ${viewState === 'completed' ? 'opacity-50 pointer-events-none scale-95 blur-sm absolute -z-10 h-0 overflow-hidden' : ''}`}>
            <DragDropZone 
              onFilesAdded={addFiles} 
              disabled={viewState === 'converting'} 
            />

            {files.length > 0 && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    Selected Images 
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">{files.length}</span>
                  </h2>
                  <button 
                    onClick={clearAll}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Clear List
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {files.map(file => (
                    <FilePreviewCard 
                      key={file.id} 
                      file={file} 
                      status={file.status}
                      onRemove={() => removeFile(file.id)}
                    />
                  ))}
                </div>

                <QualitySlider 
                  value={quality} 
                  onChange={setQuality} 
                  disabled={viewState === 'converting'} 
                />

                <div className="flex justify-center pt-4">
                  <button 
                    onClick={convert}
                    disabled={viewState === 'converting'}
                    className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-12 group"
                  >
                    {viewState === 'converting' ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="group-hover:fill-current transition-all" />
                        Convert to JPG
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Section */}
          {viewState === 'converting' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 pt-8">
              <div className="glass-card p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={32} className="animate-spin" />
                </div>
                <h3 className="text-xl font-bold">Converting your images...</h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto">
                  We're processing your HEIC files with high-precision optimization. This won't take long.
                </p>
                <ProgressBar progress={progress} />
              </div>
            </div>
          )}

          {/* Results Section */}
          {viewState === 'completed' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pt-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Conversion Complete! 🎉</h2>
                  <p className="text-[var(--text-secondary)]">Your images are ready for download.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={clearAll}
                    className="flex-1 md:flex-none px-6 py-3 border border-[var(--border)] rounded-lg font-semibold hover:bg-[var(--bg-tertiary)] transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Start Over
                  </button>
                  <button 
                    onClick={() => downloadFile(getZipDownloadUrl(batchId), `converted_images_${batchId}.zip`)}
                    className="flex-1 md:flex-none btn-primary flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download All (.ZIP)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((result, idx) => (
                  <ResultCard key={idx} result={result} batchId={batchId} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
