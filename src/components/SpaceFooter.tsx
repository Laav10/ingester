
import React from 'react';

const SpaceFooter = () => {
  return (
    <div className="text-center text-sm py-8" style={{color: 'rgba(187, 251, 255, 0.6)'}}>
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full animate-pulse" 
             style={{backgroundColor: 'rgba(78, 113, 255, 0.5)'}}></div>
        <div className="w-2 h-2 rounded-full animate-pulse" 
             style={{backgroundColor: 'rgba(141, 216, 255, 0.5)', animationDelay: '0.5s'}}></div>
        <div className="w-2 h-2 rounded-full animate-pulse" 
             style={{backgroundColor: 'rgba(84, 9, 218, 0.5)', animationDelay: '1s'}}></div>
      </div>
      <p className="font-light">Physical Research Laboratory - Cosmic Data Ingestion System v2.0</p>
      <p className="text-xs mt-1" style={{color: 'rgba(187, 251, 255, 0.4)'}}>Exploring the Universe, One Dataset at a Time</p>
    </div>
  );
};

export default SpaceFooter;
