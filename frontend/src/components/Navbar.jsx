import React from 'react';
import { Sun, Moon, Image } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--bg-secondary)] border-b border-[var(--border)] py-4 px-6 md:px-12 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-2">
        <div className="bg-accent p-1.5 rounded-lg">
          <Image className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">HEIC<span className="text-accent">2</span>JPG</span>
      </div>
      
      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)]"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
