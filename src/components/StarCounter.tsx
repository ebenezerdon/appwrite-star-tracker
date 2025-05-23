import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StarCounterProps {
  count: number;
  isLoading: boolean;
  error: string | null;
}

const StarCounter: React.FC<StarCounterProps> = ({ count, isLoading, error }) => {
  // Apply beautiful styling regardless of theme
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const prevCountRef = useRef<number>(0);
  const digitsRef = useRef<HTMLDivElement>(null);

  const celebrateMilestone = (count: number) => {
    const milestones = [50000, 60000, 70000, 80000, 90000, 100000];
    if (milestones.includes(count)) {
      // Create a massive celebration
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since they fire from two corners, we'll generate 2 sets
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    } else if (count > prevCountRef.current) {
      // Small celebration for any increase
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  useEffect(() => {
    if (count === 0 || isLoading) return;
    
    // Store previous count
    const start = prevCountRef.current;
    const end = count;
    const range = end - start;
    const duration = 1500;
    const startTime = Date.now();
    
    const animateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      const easedProgress = easeOutQuart(progress);
      
      const currentCount = Math.floor(start + range * easedProgress);
      setDisplayedCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        // Celebration happens after the count animation completes
        celebrateMilestone(end);
        prevCountRef.current = end;
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [count, isLoading]);

  // Format number with commas
  const formattedCount = displayedCount.toLocaleString();

  if (error) {
    return (
      <div className="flex flex-col items-center p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-500 mb-2">Error loading star count</div>
        <div className="text-sm text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md">
        <div 
          className={`bg-gradient-to-r from-pink-50 to-rose-50 dark:from-[#19191C] dark:to-[#2D1A24] rounded-xl p-8 border border-pink-100 dark:border-pink-500/30 shadow-lg dark:shadow-pink-900/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm dark:bg-opacity-90 ${isLoading ? 'opacity-70' : 'opacity-100'} group hover:dark:border-pink-500/50`}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all duration-700"></div>
          <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
          
          {/* Star particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-yellow-500/40 rounded-full animate-pulse"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          
          <div className="flex items-center justify-center mb-4 relative z-10">
            <Star className="w-8 h-8 text-yellow-500 mr-2 animate-pulse" />
            <h2 className="text-2xl font-semibold text-pink-900 dark:text-pink-100">GitHub Stars</h2>
          </div>
          
          <div className="flex justify-center relative z-10">
            <div 
              ref={digitsRef} 
              className={`text-5xl md:text-6xl font-bold text-center py-4 px-2 tracking-tight font-mono text-pink-700 dark:text-pink-200 transition-all duration-300 ${isLoading ? 'blur-sm' : ''} relative`}
              style={{
                textShadow: '0 0 15px rgba(236, 72, 153, 0.3)'
              }}
            >
              {isLoading ? '0' : formattedCount}
            </div>
          </div>
          
          <div className="text-center text-pink-600 dark:text-pink-300 font-medium mt-2 relative z-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500 mr-2"></div>
                <span>Fetching latest count...</span>
              </div>
            ) : (
              <span>appwrite/appwrite</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarCounter;