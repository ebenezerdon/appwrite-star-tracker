import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StarCounterProps {
  count: number;
  isLoading: boolean;
  error: string | null;
}

const StarCounter: React.FC<StarCounterProps> = ({ count, isLoading, error }) => {
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
          className={`bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-900 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800 shadow-lg transition-all duration-500 ${isLoading ? 'opacity-70' : 'opacity-100'}`}
        >
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-500 mr-2 animate-pulse" />
            <h2 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-100">GitHub Stars</h2>
          </div>
          
          <div className="flex justify-center">
            <div 
              ref={digitsRef} 
              className={`text-5xl md:text-6xl font-bold text-center py-4 px-2 tracking-tight font-mono text-indigo-700 dark:text-indigo-200 transition-all duration-300 ${isLoading ? 'blur-sm' : ''}`}
            >
              {isLoading ? '0' : formattedCount}
            </div>
          </div>
          
          <div className="text-center text-indigo-600 dark:text-indigo-300 font-medium mt-2">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2"></div>
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