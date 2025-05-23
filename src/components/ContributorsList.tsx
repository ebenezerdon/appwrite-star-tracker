import React, { useEffect, useState } from 'react'
import { fetchContributors, Contributor } from '../services/githubExtended'

interface ContributorsListProps {
  owner: string
  repo: string
}

const ContributorsList: React.FC<ContributorsListProps> = ({ owner, repo }) => {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContributors = async () => {
      try {
        setIsLoading(true)
        const data = await fetchContributors(owner, repo)
        setContributors(data)
        setError(null)
      } catch (err) {
        setError('Failed to load contributors')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadContributors()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || contributors.length === 0) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300 text-sm">
        <p>Contributor data is currently unavailable.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-6 text-center">
        Top Contributors
      </h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-2xl mx-auto">
        {contributors.map((contributor) => (
          <a
            key={contributor.login}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <div className="relative mb-6">
              {/* Avatar with pink border on hover */}
              <img
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
                className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-pink-500 transition-all duration-300"
              />
              
              {/* Contribution count badge - now below the avatar */}
              <div 
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 min-w-10 px-2 py-1 
                         bg-gradient-to-r from-pink-500 to-rose-500 rounded-full 
                         flex items-center justify-center text-white text-xs font-bold shadow-md"
              >
                {contributor.contributions.toLocaleString()}
              </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-pink-300 group-hover:text-pink-600 dark:group-hover:text-pink-200 transition-colors duration-300">
              {contributor.login}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContributorsList
