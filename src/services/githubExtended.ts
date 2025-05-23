import { getCurrentSession } from './appwrite'

// Types for the extended GitHub data
export interface StarHistory {
  count: number
  date: string
}

export interface Contributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface Release {
  name: string
  tag_name: string
  published_at: string
  html_url: string
  body: string
}

export interface PullRequest {
  title: string
  html_url: string
  user: {
    login: string
    avatar_url: string
  }
  merged_at: string
  number: number
}

export interface LanguageData {
  [key: string]: number
}

export interface CommitActivity {
  days: number[]
  total: number
  week: number
}

// Helper function to get authenticated headers
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json'
  }
  
  // Try to get user session from Appwrite
  const session = await getCurrentSession()
  
  // If user is authenticated and has a GitHub token, use it
  if (session && 'githubToken' in session) {
    headers['Authorization'] = `Bearer ${session.githubToken}`
  }
  
  return headers
}

// Fetch star history (last 30 days approximation using stargazers with timestamps)
export const fetchStarHistory = async (owner: string, repo: string): Promise<StarHistory[]> => {
  try {
    const headers = await getAuthHeaders()
    headers['Accept'] = 'application/vnd.github.v3.star+json'
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stargazers?per_page=100`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Process the data to get a history of star counts
    const starHistory: StarHistory[] = []
    let count = 0
    
    // This is a simplified approach since we can only get the latest 100 stargazers
    // For a real app, we'd need to paginate and handle rate limits carefully
    data.forEach((item: any) => {
      count++
      starHistory.push({
        count,
        date: item.starred_at
      })
    })
    
    return starHistory
  } catch (error) {
    console.error('Error fetching star history:', error)
    return []
  }
}

// Fetch recent contributors
export const fetchContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching contributors:', error)
    return []
  }
}

// Fetch latest release
export const fetchLatestRelease = async (owner: string, repo: string): Promise<Release | null> => {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching latest release:', error)
    return null
  }
}

// Fetch recent pull requests
export const fetchRecentPullRequests = async (owner: string, repo: string): Promise<PullRequest[]> => {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=5`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching pull requests:', error)
    return []
  }
}

// Fetch language breakdown
export const fetchLanguages = async (owner: string, repo: string): Promise<LanguageData> => {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching languages:', error)
    return {}
  }
}

// Fetch commit activity
export const fetchCommitActivity = async (owner: string, repo: string): Promise<CommitActivity[]> => {
  try {
    const headers = await getAuthHeaders()
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`,
      { headers }
    )
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching commit activity:', error)
    return []
  }
}
