import React, { useEffect, useRef, useState } from 'react'
import { Star, Github } from 'lucide-react'
import confetti from 'canvas-confetti'
// onLogin prop is used instead of direct import

interface StarCounterProps {
  count: number
  isLoading: boolean
  error: string | null
  lastUpdated?: string
  onLogin?: () => Promise<void>
}

const StarCounter: React.FC<StarCounterProps> = ({
  count,
  isLoading,
  error,
  lastUpdated,
  onLogin,
}) => {
  // Format the last updated time
  const formatLastUpdated = (isoString: string): string => {
    if (!isoString) return 'Never'
    
    const date = new Date(isoString)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date)
  }
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleGitHubLogin = async () => {
    try {
      setIsAuthenticating(true)
      if (onLogin) {
        await onLogin()
      }
    } catch (error) {
      console.error('GitHub login error:', error)
    } finally {
      // This may not execute if the page redirects
      setIsAuthenticating(false)
    }
  }
  const [displayedCount, setDisplayedCount] = useState<number>(0)
  const prevCountRef = useRef<number>(0)
  const digitsRef = useRef<HTMLDivElement>(null)

  const celebrateMilestone = (count: number) => {
    const milestones = [50000, 60000, 70000, 80000, 90000, 100000]
    if (milestones.includes(count)) {
      // Create a massive celebration
      const duration = 15 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    } else if (count > prevCountRef.current) {
      // Small celebration for any increase
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  useEffect(() => {
    if (count === 0 || isLoading) return

    // Store previous count
    const start = prevCountRef.current
    const end = count
    const range = end - start
    const duration = 1500
    const startTime = Date.now()

    const animateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)
      const easedProgress = easeOutQuart(progress)

      const currentCount = Math.floor(start + range * easedProgress)
      setDisplayedCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animateCount)
      } else {
        // Celebration happens after the count animation completes
        celebrateMilestone(end)
        prevCountRef.current = end
      }
    }

    requestAnimationFrame(animateCount)
  }, [count, isLoading])

  // Format number with commas
  const formattedCount = displayedCount.toLocaleString()

  if (error) {
    return (
      <div className="relative w-full">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-[#19191C] dark:to-[#2D1A24] rounded-xl p-8 border border-pink-100 dark:border-pink-500/30 shadow-lg dark:shadow-pink-900/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>

          <div className="flex items-center justify-center mb-4 relative z-10">
            <svg
              className="w-6 h-6 text-pink-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-medium text-pink-700 dark:text-pink-300">
              Just a moment
            </h2>
          </div>

          <div
            className="text-sm text-pink-600 dark:text-pink-200 mb-4 leading-relaxed text-center relative z-10"
            dangerouslySetInnerHTML={{ __html: error }}
          />

          {/* Removed duplicate text about rate limits since it's already in the error message */}

          {/* Only show sign-in button if the error message contains the sign-in prompt */}
          {error.includes('Sign in with GitHub') && (
            <div className="flex justify-center relative z-10">
              <button
                onClick={handleGitHubLogin}
                disabled={isAuthenticating}
                className={`flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg ${
                  isAuthenticating ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isAuthenticating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Github size={18} />
                    Sign in with GitHub
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md">
        <div
          className={`bg-gradient-to-r from-pink-50 to-rose-50 dark:from-[#19191C] dark:to-[#2D1A24] rounded-xl p-8 border border-pink-100 dark:border-pink-500/30 shadow-lg dark:shadow-pink-900/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm dark:bg-opacity-90 ${
            isLoading ? 'opacity-70' : 'opacity-100'
          } group hover:dark:border-pink-500/50`}
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
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          <div className="flex items-center justify-center mb-4 relative z-10">
            <Star className="w-8 h-8 text-yellow-500 mr-2 animate-pulse" />
            <h2 className="text-2xl font-semibold text-pink-900 dark:text-pink-100">
              GitHub stars
            </h2>
          </div>

          <div className="flex justify-center relative z-10">
            <div
              ref={digitsRef}
              className={`text-5xl md:text-6xl font-bold text-center py-4 px-2 tracking-tight font-mono text-pink-700 dark:text-pink-200 transition-all duration-300 ${
                isLoading ? 'blur-sm' : ''
              } relative`}
              style={{
                textShadow: '0 0 15px rgba(236, 72, 153, 0.3)',
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
              <div className="flex flex-col items-center">
                <span>appwrite/appwrite</span>
                <div className="text-xs text-pink-500/70 dark:text-pink-300/70 mt-2">
                  Last updated: {formatLastUpdated(lastUpdated || '')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StarCounter
