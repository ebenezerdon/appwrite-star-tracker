import { useState, useEffect } from 'react'

interface GitHubRepoStats {
  starCount: number
  forkCount: number
  watcherCount: number
  lastUpdated: string
  isLoading: boolean
  error: string | null
}

interface UseGitHubStatsOptions {
  owner: string
  repo: string
  refreshInterval?: number
}

export const useGitHubStats = ({
  owner,
  repo,
  refreshInterval = 60000,
}: UseGitHubStatsOptions): GitHubRepoStats => {
  const [stats, setStats] = useState<GitHubRepoStats>({
    starCount: 0,
    forkCount: 0,
    watcherCount: 0,
    lastUpdated: '',
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        )

        // Check for rate limit errors (403 or 429 status codes)
        if (response.status === 403 || response.status === 429) {
          // Get rate limit reset time from headers if available
          const rateLimitReset = response.headers.get('x-ratelimit-reset')
          let resetMessage = ''

          if (rateLimitReset) {
            // Convert Unix timestamp to readable time
            const resetDate = new Date(parseInt(rateLimitReset) * 1000)
            const resetTimeString = resetDate.toLocaleTimeString()
            resetMessage = ` Rate limit will reset at ${resetTimeString}.`
          }

          throw new Error(
            `Looks like you've exceeded GitHub's hourly request limit.${resetMessage} <br/><br/>Take a short break and check back soon!`,
          )
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()

        setStats({
          starCount: data.stargazers_count,
          forkCount: data.forks_count,
          watcherCount: data.subscribers_count,
          lastUpdated: new Date().toISOString(),
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
        }))
      }
    }

    // Initial fetch
    fetchRepoStats()

    // Set up interval for refreshing
    const intervalId = setInterval(fetchRepoStats, refreshInterval)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [owner, repo, refreshInterval])

  return stats
}
