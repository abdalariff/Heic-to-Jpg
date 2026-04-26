import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-[var(--border)] mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold mb-1">HEIC2JPG Local</p>
          <p className="text-xs text-[var(--text-secondary)]">Production-grade local conversion tool.</p>
        </div>
        
        <div className="flex gap-8 text-[var(--text-secondary)] text-sm">
          <span className="hover:text-accent cursor-default transition-colors">Privacy First</span>
          <span className="hover:text-accent cursor-default transition-colors">Local Processing</span>
          <span className="hover:text-accent cursor-default transition-colors">Open Source</span>
        </div>
        
        <p className="text-xs text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Built with ❤️ on Localhost
        </p>
      </div>
    </footer>
  );
};

export default Footer;
