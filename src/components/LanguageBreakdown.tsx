import React, { useEffect, useState } from 'react'
import { fetchLanguages, LanguageData } from '../services/githubExtended'

interface LanguageBreakdownProps {
  owner: string
  repo: string
}

// Color mapping for common languages
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#777bb4',
  Python: '#3572A5',
  Java: '#b07219',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Ruby: '#CC342D',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Shell: '#89e051',
  // Add more as needed
}

// Get a color for a language, with fallback for unknown languages
const getLanguageColor = (language: string): string => {
  return languageColors[language] || `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

const LanguageBreakdown: React.FC<LanguageBreakdownProps> = ({ owner, repo }) => {
  const [languages, setLanguages] = useState<LanguageData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setIsLoading(true)
        const data = await fetchLanguages(owner, repo)
        setLanguages(data)
        setError(null)
      } catch (err) {
        setError('Failed to load language data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadLanguages()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || Object.keys(languages).length === 0) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300 text-sm">
        <p>Language data is currently unavailable.</p>
      </div>
    )
  }

  // Calculate total bytes
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)

  // Sort languages by bytes (descending)
  const sortedLanguages = Object.entries(languages)
    .sort(([, bytesA], [, bytesB]) => bytesB - bytesA)
    .slice(0, 8) // Limit to top 8 languages

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4">
        Language Breakdown
      </h3>
      
      {/* Language bar visualization */}
      <div className="h-6 rounded-full overflow-hidden flex mb-4">
        {sortedLanguages.map(([language, bytes]) => {
          const percentage = (bytes / totalBytes) * 100
          return (
            <div
              key={language}
              className="h-full group relative"
              style={{
                width: `${percentage}%`,
                backgroundColor: getLanguageColor(language),
                minWidth: '4px', // Ensure very small segments are still visible
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {language}: {percentage.toFixed(1)}%
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Language legend */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {sortedLanguages.map(([language, bytes]) => {
          const percentage = (bytes / totalBytes) * 100
          return (
            <div key={language} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getLanguageColor(language) }}
              ></div>
              <span className="text-gray-700 dark:text-pink-200">
                {language}
              </span>
              <span className="ml-auto text-gray-500 dark:text-pink-300/70">
                {percentage.toFixed(1)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageBreakdown
