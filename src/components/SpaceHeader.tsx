
import React from 'react';
import { Rocket, Satellite, Zap, Globe } from "lucide-react";

const SpaceHeader = () => {
  return (
    <div className="text-center space-y-6 mb-16">
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="p-4 rounded-full backdrop-blur-sm border" 
             style={{backgroundColor: 'rgba(78, 113, 255, 0.2)', borderColor: 'rgba(187, 251, 255, 0.3)'}}>
          <Rocket className="w-8 h-8" style={{color: '#8DD8FF'}} />
        </div>
        <div className="h-px w-12" style={{background: 'linear-gradient(to right, transparent, rgba(187, 251, 255, 0.5), transparent)'}}></div>
        <div className="p-4 rounded-full backdrop-blur-sm border" 
             style={{backgroundColor: 'rgba(141, 216, 255, 0.2)', borderColor: 'rgba(78, 113, 255, 0.3)'}}>
          <Satellite className="w-8 h-8" style={{color: '#4E71FF'}} />
        </div>
      </div>
      
      <h1 className="text-5xl font-bold leading-tight" 
          style={{background: 'linear-gradient(to right, #BBFBFF, #8DD8FF, #4E71FF)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent'}}>
        Physical Research Laboratory
      </h1>
      <p className="text-2xl font-light" style={{color: '#8DD8FF'}}>Cosmic Data Ingestion System</p>
      
      {/* Animated divider */}
      <div className="flex justify-center items-center gap-2">
        <div className="w-8 h-px" style={{background: 'linear-gradient(to right, transparent, rgba(78, 113, 255, 0.6))'}}></div>
        <Zap className="w-4 h-4 animate-pulse" style={{color: '#4E71FF'}} />
        <div className="w-16 h-px" style={{background: 'linear-gradient(to right, rgba(78, 113, 255, 0.6), rgba(141, 216, 255, 0.6), rgba(78, 113, 255, 0.6))'}}></div>
        <Globe className="w-4 h-4 animate-spin" style={{color: '#8DD8FF', animationDuration: '8s'}} />
        <div className="w-8 h-px" style={{background: 'linear-gradient(to left, transparent, rgba(141, 216, 255, 0.6))'}}></div>
      </div>
    </div>
  );
};

export default SpaceHeader;
