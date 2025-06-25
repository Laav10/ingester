
import React from 'react';

const SpaceFooter = () => {
  return (
    <div className="text-center text-blue-200/60 text-sm py-8">
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="w-2 h-2 bg-indigo-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <p className="font-light">Physical Research Laboratory - Cosmic Data Ingestion System v2.0</p>
      <p className="text-xs text-blue-300/40 mt-1">Exploring the Universe, One Dataset at a Time</p>
    </div>
  );
};

export default SpaceFooter;
