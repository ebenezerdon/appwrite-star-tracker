import React from 'react';

interface BackgroundPatternProps {
  className?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top geometric pattern */}
      <svg 
        className="absolute top-0 right-0 w-full h-auto text-pink-500/15 dark:text-pink-500/20" 
        viewBox="0 0 1440 400" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        
        {/* Geometric stars */}
        <g transform="translate(1200, 200)">
          <polygon 
            points="0,0 29,0 15,-20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -15,20 15,20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -29,0 -15,-20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </g>
        
        <g transform="translate(1000, 100)">
          <polygon 
            points="0,0 20,0 10,-15" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -10,15 10,15" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -20,0 -10,-15" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </g>
        
        <g transform="translate(800, 300)">
          <polygon 
            points="0,0 25,0 12,-18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -12,18 12,18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <polygon 
            points="0,0 -25,0 -12,-18" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </g>
      </svg>
      
      {/* Bottom geometric pattern */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-auto text-rose-500/15 dark:text-rose-500/20" 
        viewBox="0 0 1440 400" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        
        {/* Geometric lines */}
        <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 5" />
        <line x1="100" y1="0" x2="100" y2="300" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 5" />
        <line x1="300" y1="0" x2="300" y2="400" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 5" />
        <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 5" />
        
        {/* Star symbol */}
        <g transform="translate(200, 200)">
          <polygon 
            points="0,-30 8.8,-9.3 30,-9.3 12.9,3.5 19.1,25.8 0,15 -19.1,25.8 -12.9,3.5 -30,-9.3 -8.8,-9.3" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </g>
      </svg>
      
      {/* Center radial pattern */}
      <svg 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full text-pink-600/[0.08] dark:text-pink-600/[0.15]" 
        viewBox="0 0 1000 1000" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric circles */}
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="500" cy="500" r="300" />
          <circle cx="500" cy="500" r="250" />
          <circle cx="500" cy="500" r="200" />
          <circle cx="500" cy="500" r="150" />
          <circle cx="500" cy="500" r="100" />
          <circle cx="500" cy="500" r="50" />
        </g>
        
        {/* Radial lines */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) * Math.PI / 180;
          const x = Math.cos(angle) * 300;
          const y = Math.sin(angle) * 300;
          return (
            <line 
              key={i}
              x1="500" 
              y1="500" 
              x2={500 + x} 
              y2={500 + y} 
              stroke="currentColor" 
              strokeWidth="0.8" 
            />
          );
        })}
        
        {/* Star at center */}
        <polygon 
          points="500,460 515,490 550,490 525,510 535,545 500,525 465,545 475,510 450,490 485,490" 
          fill="currentColor" 
          fillOpacity="0.15"
          stroke="currentColor" 
          strokeWidth="1.5"
        />
      </svg>
      
      {/* Star particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = 1 + Math.random() * 1.5;
          return (
            <div 
              key={i}
              className="absolute rounded-full animate-pulse bg-pink-500/50"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundPattern;
