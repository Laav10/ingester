
import React, { useEffect } from 'react';

const SpaceBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-blue-200/20 rounded-full animate-pulse';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
  }, []);

  return (
    <>
      {/* Animated background elements */}
      <div id="stars-container" className="absolute inset-0 z-0"></div>
      
      {/* Nebula effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
    </>
  );
};

export default SpaceBackground;
