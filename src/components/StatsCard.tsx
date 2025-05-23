import React from 'react';
import { GitFork, Eye } from 'lucide-react';

interface StatsCardProps {
  forkCount: number;
  watcherCount: number;
  lastUpdated: string;
  isLoading: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  forkCount, 
  watcherCount, 
  lastUpdated,
  isLoading
}) => {
  // Format the last updated time
  const formatLastUpdated = (isoString: string): string => {
    if (!isoString) return 'Never';
    
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-500">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Additional Statistics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <GitFork className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Forks</div>
            <div className={`text-xl font-semibold text-gray-800 dark:text-white ${isLoading ? 'opacity-50' : ''}`}>
              {isLoading ? '...' : forkCount.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Eye className="w-5 h-5 text-purple-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Watchers</div>
            <div className={`text-xl font-semibold text-gray-800 dark:text-white ${isLoading ? 'opacity-50' : ''}`}>
              {isLoading ? '...' : watcherCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-right">
        Last updated: {isLoading ? '...' : formatLastUpdated(lastUpdated)}
      </div>
    </div>
  );
};

export default StatsCard;