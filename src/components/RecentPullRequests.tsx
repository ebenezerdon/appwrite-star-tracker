import React, { useEffect, useState } from 'react'
import { fetchRecentPullRequests, PullRequest } from '../services/githubExtended'

interface RecentPullRequestsProps {
  owner: string
  repo: string
}

const RecentPullRequests: React.FC<RecentPullRequestsProps> = ({ owner, repo }) => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPullRequests = async () => {
      try {
        setIsLoading(true)
        const data = await fetchRecentPullRequests(owner, repo)
        setPullRequests(data.filter(pr => pr.merged_at)) // Only show merged PRs
        setError(null)
      } catch (err) {
        setError('Failed to load pull requests')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPullRequests()
  }, [owner, repo])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error || pullRequests.length === 0) {
    return (
      <div className="text-center p-4 text-pink-600 dark:text-pink-300 text-sm">
        <p>Pull request data is currently unavailable.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-700 dark:text-pink-200 mb-4">
        Recent Merged PRs
      </h3>
      <div className="space-y-3">
        {pullRequests.map((pr) => {
          // Format the merge date
          const mergeDate = pr.merged_at ? new Date(pr.merged_at) : null
          const formattedDate = mergeDate
            ? mergeDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : 'Not merged'

          return (
            <a
              key={pr.number}
              href={pr.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-[#261A22] rounded-lg border dark:border-pink-500/30 p-3 hover:shadow-md dark:hover:shadow-pink-900/20 transition-all duration-300"
            >
              <div className="flex items-start">
                <img
                  src={pr.user.avatar_url}
                  alt={`${pr.user.login}'s avatar`}
                  className="w-8 h-8 rounded-full mr-3 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full mr-2">
                      #{pr.number}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-pink-300/70">
                      Merged on {formattedDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-pink-100 line-clamp-1">
                    {pr.title}
                  </h4>
                  <div className="text-xs text-gray-600 dark:text-pink-300 mt-1">
                    by {pr.user.login}
                  </div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default RecentPullRequests
