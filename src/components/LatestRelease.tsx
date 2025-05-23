import React, { useEffect, useState } from 'react'
import { fetchLatestRelease, Release } from '../services/githubExtended'

interface LatestReleaseProps {
  owner: string
  repo: string
}

const LatestRelease: React.FC<LatestReleaseProps> = ({ owner, repo }) => {
  const [release, setRelease] = useState<Release | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRelease = async () => {
      try {
        setIsLoading(true)
        const data = await fetchLatestRelease(owner, repo)
        setRelease(data)
        setError(null)
      } catch (err) {
        setError('Failed to load latest release')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadRelease()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || !release) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300 text-sm">
        <p>Release information is currently unavailable.</p>
      </div>
    )
  }

  // Format the release date
  const releaseDate = new Date(release.published_at)
  const formattedDate = releaseDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // Truncate the release notes if they're too long
  const truncateReleaseNotes = (notes: string) => {
    if (notes.length > 200) {
      return notes.substring(0, 200) + '...'
    }
    return notes
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4">
        Latest Release
      </h3>
      <div className="bg-white dark:bg-[#261A22] rounded-lg border dark:border-pink-500/30 p-4 shadow-sm dark:shadow-pink-900/20">
        <div className="flex items-center mb-2">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-1 rounded-full mr-2">
            {release.tag_name}
          </div>
          <span className="text-sm text-gray-500 dark:text-pink-300/70">
            Released on {formattedDate}
          </span>
        </div>
        
        <h4 className="text-base font-medium text-gray-800 dark:text-pink-100 mb-2">
          {release.name || 'Unnamed Release'}
        </h4>
        
        <div className="text-sm text-gray-600 dark:text-pink-200 mb-3 whitespace-pre-line">
          {truncateReleaseNotes(release.body || 'No release notes provided.')}
        </div>
        
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-pink-600 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-200 transition-colors duration-300"
        >
          View full release
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default LatestRelease
