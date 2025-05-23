import React from 'react';

interface BackgroundPatternProps {
  className?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top-right decorative elements */}
      <svg 
        className="absolute top-0 right-0 w-1/3 h-auto text-pink-500/5 dark:text-pink-500/10" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill="currentColor" 
          d="M42.8,-73.1C56.9,-66.2,70.8,-57.1,79.6,-44.1C88.4,-31.1,92.2,-15.6,90.6,-0.9C89,13.7,82,27.4,73.1,39.5C64.2,51.6,53.5,62.1,40.8,70.4C28.1,78.8,14.1,85,0.2,84.7C-13.7,84.4,-27.3,77.6,-41.3,70.1C-55.3,62.6,-69.7,54.4,-78.3,42.1C-86.9,29.8,-89.7,13.4,-88.5,-2.3C-87.3,-18,-82.1,-33.9,-73.1,-47.1C-64.1,-60.3,-51.3,-70.7,-37.4,-77.5C-23.5,-84.3,-8.5,-87.5,3.2,-82.9C14.9,-78.3,28.7,-80,42.8,-73.1Z" 
          transform="translate(100 100)" 
        />
      </svg>
      
      {/* Bottom-left decorative elements */}
      <svg 
        className="absolute bottom-0 left-0 w-1/3 h-auto text-rose-500/5 dark:text-rose-500/10" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill="currentColor" 
          d="M46.5,-78.3C59.2,-71.5,68.2,-58.1,76.1,-44.2C84,-30.2,90.8,-15.1,89.3,-0.9C87.8,13.4,78,26.8,69.3,40.8C60.6,54.8,53,69.5,41.2,77.3C29.3,85.1,13.2,86.1,-1.2,87.8C-15.5,89.6,-31,92.1,-43.4,86.3C-55.8,80.5,-65.1,66.4,-72.8,52C-80.6,37.5,-86.8,22.8,-87.2,7.9C-87.6,-7,-82.2,-22.1,-74.5,-35.4C-66.8,-48.7,-56.9,-60.2,-44.5,-67C-32.1,-73.8,-17.2,-75.9,-1.2,-74C14.8,-72.1,33.8,-85.1,46.5,-78.3Z" 
          transform="translate(100 100)" 
        />
      </svg>
      
      {/* Center decorative elements */}
      <svg 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full text-pink-600/[0.03] dark:text-pink-600/[0.07]" 
        viewBox="0 0 1000 1000" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="500" cy="500" r="300" />
          <circle cx="500" cy="500" r="250" />
          <circle cx="500" cy="500" r="200" />
          <circle cx="500" cy="500" r="150" />
          <circle cx="500" cy="500" r="100" />
          <circle cx="500" cy="500" r="50" />
        </g>
      </svg>
      
      {/* Small decorative stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-pink-500/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundPattern;
