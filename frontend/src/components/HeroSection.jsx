import React from 'react';

const HeroSection = () => {
  return (
    <div className="pt-32 pb-12 text-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        Convert HEIC to JPG <br />
        <span className="text-accent">Fast, Free, and Local.</span>
      </h1>
      <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
        No cloud, no privacy concerns. Process your iPhone images directly on your machine with production-grade quality.
      </p>
    </div>
  );
};

export default HeroSection;
