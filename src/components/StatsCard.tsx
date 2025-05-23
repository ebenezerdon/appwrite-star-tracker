import React from 'react'
import { GitFork, Eye } from 'lucide-react'

interface StatsCardProps {
  forkCount: number
  watcherCount: number
  isLoading: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  forkCount,
  watcherCount,
  isLoading,
}) => {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#19191C] dark:to-[#231A23] rounded-xl shadow-md p-6 border border-gray-100 dark:border-pink-500/20 dark:shadow-pink-900/20 dark:shadow-lg transition-all duration-500 backdrop-blur-sm dark:bg-opacity-80 hover:dark:border-pink-500/40 relative overflow-hidden group">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl group-hover:bg-pink-500/10 transition-all duration-700"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-all duration-700"></div>
      <h3
        className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4 relative z-10"
        style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.2)' }}
      >
        Additional stats
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-gray-50 dark:bg-[#261A22] rounded-lg border dark:border-pink-500/30 dark:hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group/stat hover:dark:shadow-md hover:dark:shadow-pink-900/20 backdrop-blur-sm dark:bg-opacity-90">
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:to-rose-500/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
          <GitFork className="w-5 h-5 text-rose-500 mr-3 relative z-10 group-hover/stat:scale-110 transition-transform duration-300" />
          <div>
            <div className="text-sm text-gray-500 dark:text-pink-300/80 relative z-10">
              Forks
            </div>
            <div
              className={`text-xl font-semibold text-gray-800 dark:text-pink-100 ${
                isLoading ? 'opacity-50' : ''
              } relative z-10`}
              style={{ textShadow: '0 0 8px rgba(236, 72, 153, 0.2)' }}
            >
              {isLoading ? '...' : forkCount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 dark:bg-[#261A22] rounded-lg border dark:border-pink-500/30 dark:hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group/stat hover:dark:shadow-md hover:dark:shadow-pink-900/20 backdrop-blur-sm dark:bg-opacity-90">
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:to-rose-500/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
          <Eye className="w-5 h-5 text-pink-500 mr-3 relative z-10 group-hover/stat:scale-110 transition-transform duration-300" />
          <div>
            <div className="text-sm text-gray-500 dark:text-pink-300/80 relative z-10">
              Watchers
            </div>
            <div
              className={`text-xl font-semibold text-gray-800 dark:text-pink-100 ${
                isLoading ? 'opacity-50' : ''
              } relative z-10`}
              style={{ textShadow: '0 0 8px rgba(236, 72, 153, 0.2)' }}
            >
              {isLoading ? '...' : watcherCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Last updated information moved to StarCounter component */}
    </div>
  )
}

export default StatsCard
