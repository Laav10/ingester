
import React from 'react';
import { Rocket, Satellite, Zap, Globe } from "lucide-react";

const SpaceHeader = () => {
  return (
    <div className="text-center space-y-6 mb-16">
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30">
          <Rocket className="w-8 h-8 text-cyan-300" />
        </div>
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm border border-cyan-400/30">
          <Satellite className="w-8 h-8 text-blue-300" />
        </div>
      </div>
      
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent leading-tight">
        Physical Research Laboratory
      </h1>
      <p className="text-2xl text-cyan-300/90 font-light">Cosmic Data Ingestion System</p>
      
      {/* Animated divider */}
      <div className="flex justify-center items-center gap-2">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-400/60"></div>
        <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
        <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 via-cyan-400/60 to-blue-400/60"></div>
        <Globe className="w-4 h-4 text-cyan-400 animate-spin" style={{animationDuration: '8s'}} />
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
      </div>
    </div>
  );
};

export default SpaceHeader;
