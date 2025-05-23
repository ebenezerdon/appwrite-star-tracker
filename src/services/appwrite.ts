import { Client, Account } from 'appwrite'

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('appwrite-star-tracker')

// Initialize Appwrite account
const account = new Account(client)

// GitHub OAuth login
export const loginWithGitHub = async () => {
  try {
    // Create OAuth session for GitHub
    account.createOAuth2Session(
      'github',
      window.location.href, // Success URL (redirect back to the same page)
      window.location.href, // Failure URL
    )
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    throw error
  }
}

// Get current session and GitHub token
export const getCurrentSession = async () => {
  try {
    // Get the user account
    const user = await account.get()

    if (!user) return null

    try {
      // Get the list of active sessions
      const sessions = await account.listSessions()

      // Find OAuth session with GitHub provider
      const githubSession = sessions.sessions.find(
        (session) => session.provider === 'github',
      )

      if (githubSession && githubSession.providerAccessToken) {
        return {
          ...user,
          githubToken: githubSession.providerAccessToken,
        }
      }

      return user
    } catch (sessionError) {
      console.error('Error getting sessions:', sessionError)
      return user
    }
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Logout
export const logout = async () => {
  try {
    await account.deleteSession('current')
    return true
  } catch (error) {
    console.error('Logout error:', error)
    return false
  }
}

export { client, account }
