import React, { useEffect, useState } from 'react'
import { fetchStarHistory, StarHistory } from '../services/githubExtended'

interface StarGrowthChartProps {
  owner: string
  repo: string
}

const StarGrowthChart: React.FC<StarGrowthChartProps> = ({ owner, repo }) => {
  const [starHistory, setStarHistory] = useState<StarHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStarHistory = async () => {
      try {
        setIsLoading(true)
        const history = await fetchStarHistory(owner, repo)
        setStarHistory(history)
        setError(null)
      } catch (err) {
        setError('Failed to load star history')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadStarHistory()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || starHistory.length === 0) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300">
        <p>Star history data is currently unavailable.</p>
        <p className="text-xs mt-2 text-pink-500/70 dark:text-pink-300/70">
          This may be due to API rate limits or authentication requirements.
        </p>
      </div>
    )
  }

  // Simple visualization without external libraries
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4">
        Recent Star Growth
      </h3>
      <div className="relative h-40 mt-4">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-pink-200 dark:bg-pink-700/30"></div>
        <div className="flex items-end justify-between h-full">
          {starHistory.slice(-10).map((point, index) => {
            // Calculate height percentage based on the max value
            const maxCount = Math.max(...starHistory.map(p => p.count))
            const heightPercentage = (point.count / maxCount) * 100
            
            // Format date for display
            const date = new Date(point.date)
            const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`
            
            return (
              <div key={index} className="flex flex-col items-center mx-1 relative">
                <div 
                  className="w-4 bg-gradient-to-t from-pink-500 to-rose-400 rounded-t-sm hover:from-pink-600 hover:to-rose-500 transition-all duration-300 group"
                  style={{ height: `${heightPercentage}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {point.count} stars
                  </div>
                </div>
                <div className="text-xs text-pink-600 dark:text-pink-300 mt-1 rotate-45 origin-left">
                  {dateLabel}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-xs text-center text-pink-500/70 dark:text-pink-300/70 mt-8">
        Showing the last {Math.min(10, starHistory.length)} stargazers data
      </div>
    </div>
  )
}

export default StarGrowthChart
