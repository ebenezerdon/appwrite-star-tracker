import React, { useEffect, useState } from 'react'
import { fetchCommitActivity, CommitActivity } from '../services/githubExtended'

interface CommitActivityHeatmapProps {
  owner: string
  repo: string
}

const CommitActivityHeatmap: React.FC<CommitActivityHeatmapProps> = ({ owner, repo }) => {
  const [commitData, setCommitData] = useState<CommitActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCommitActivity = async () => {
      try {
        setIsLoading(true)
        const data = await fetchCommitActivity(owner, repo)
        setCommitData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load commit activity')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCommitActivity()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || commitData.length === 0) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300 text-sm">
        <p>Commit activity data is currently unavailable.</p>
      </div>
    )
  }

  // Get the maximum commit count for scaling
  const maxCommits = Math.max(
    ...commitData.flatMap(week => [...week.days, week.total])
  )

  // Get color intensity based on commit count
  const getColorIntensity = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
    
    const intensity = Math.min(Math.ceil((count / maxCommits) * 4), 4)
    
    switch (intensity) {
      case 1: return 'bg-pink-200 dark:bg-pink-900/30'
      case 2: return 'bg-pink-300 dark:bg-pink-800/50'
      case 3: return 'bg-pink-400 dark:bg-pink-700/70'
      case 4: return 'bg-pink-500 dark:bg-pink-600/90'
      default: return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  // Day names for the heatmap
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4">
        Commit Activity
      </h3>
      
      <div className="flex mb-2">
        {/* Day labels on the left */}
        <div className="flex flex-col pr-2">
          {dayNames.map(day => (
            <div key={day} className="h-6 flex items-center justify-end text-xs text-gray-500 dark:text-pink-300/70">
              {day}
            </div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        <div className="flex-1 grid grid-cols-13 gap-1">
          {commitData.slice(-13).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.days.map((count, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-6 h-6 rounded-sm ${getColorIntensity(count)} group relative`}
                >
                  {count > 0 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                      {count} commits
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end items-center mt-4">
        <div className="text-xs text-gray-500 dark:text-pink-300/70 mr-2">Less</div>
        <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
        <div className="w-4 h-4 bg-pink-200 dark:bg-pink-900/30 rounded-sm ml-1"></div>
        <div className="w-4 h-4 bg-pink-300 dark:bg-pink-800/50 rounded-sm ml-1"></div>
        <div className="w-4 h-4 bg-pink-400 dark:bg-pink-700/70 rounded-sm ml-1"></div>
        <div className="w-4 h-4 bg-pink-500 dark:bg-pink-600/90 rounded-sm ml-1"></div>
        <div className="text-xs text-gray-500 dark:text-pink-300/70 ml-2">More</div>
      </div>
    </div>
  )
}

export default CommitActivityHeatmap
