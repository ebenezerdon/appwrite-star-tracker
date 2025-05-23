import { useState, useEffect } from 'react'
import BackgroundPattern from './components/BackgroundPattern'
import Header from './components/Header'
import StarCounter from './components/StarCounter'
import StatsCard from './components/StatsCard'
import ContributorsList from './components/ContributorsList'
import LatestRelease from './components/LatestRelease'
import RecentPullRequests from './components/RecentPullRequests'
import Footer from './components/Footer'
import ShareButton from './components/ShareButton'
import { useGitHubStats } from './services/github'
import { loginWithGitHub } from './services/appwrite'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    setIsDarkMode(prefersDark)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  // Apply theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  // Fetch GitHub stats for Appwrite
  const { starCount, forkCount, watcherCount, lastUpdated, isLoading, error } =
    useGitHubStats({
      owner: 'appwrite',
      repo: 'appwrite',
      refreshInterval: 30000, // Refresh every 30 seconds
    })

  // Update document title with star count
  useEffect(() => {
    if (starCount > 0) {
      document.title = `${starCount.toLocaleString()} Stars - Appwrite Tracker`
    }
  }, [starCount])

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-50 dark:bg-[#19191C] transition-colors duration-500 relative overflow-hidden`}
    >
      <BackgroundPattern />
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* Pink glow effect at the top */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent blur-xl"></div>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Watch Appwrite's stars grow in real-time! ✨
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3 max-w-2xl">
              Join us in celebrating Appwrite's journey to the stars! See how
              the community is growing and share in the excitement.
            </p>
          </div>

          <div className="mb-6">
            <StarCounter
              count={starCount}
              isLoading={isLoading}
              error={error}
              lastUpdated={lastUpdated}
              onLogin={loginWithGitHub}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard
              forkCount={forkCount}
              watcherCount={watcherCount}
              isLoading={isLoading}
            />

            <div className="bg-white dark:bg-gradient-to-br dark:from-[#19191C] dark:via-[#261A22] dark:to-[#2A1A22] rounded-xl shadow-md p-6 border border-gray-100 dark:border-pink-500/20 dark:shadow-pink-900/20 dark:shadow-lg flex flex-col justify-between backdrop-blur-sm dark:bg-opacity-80 transition-all duration-300 hover:dark:border-pink-500/30 group">
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Spread the Word! ✨
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Excited about Appwrite's growth? Share Appwrite's GitHub star
                  count with your network.
                </p>
              </div>

              <div className="flex justify-center">
                <ShareButton starCount={starCount} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gradient-to-r dark:from-[#19191C] dark:to-[#2D1A24] rounded-xl shadow-md p-8 border border-gray-100 dark:border-pink-500/30 dark:shadow-pink-900/30 dark:shadow-xl mb-8 backdrop-blur-sm dark:bg-opacity-90 transition-all duration-300 hover:dark:border-pink-500/50 relative overflow-hidden group">
            {/* Decorative elements */}
            <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-500"></div>
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/15 transition-all duration-700"></div>

            <div className="relative z-10">
              <h3
                className="text-xl font-bold text-gray-800 dark:text-pink-100 mb-5"
                style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.3)' }}
              >
                What's Appwrite? ✨
              </h3>
              <p className="text-gray-700 dark:text-pink-50 mb-5 leading-relaxed text-base">
                Appwrite is a cloud platform for building Web, Mobile, and
                Backend apps. It includes both a backend server and a fully
                integrated hosting solution for deploying static and server-side
                rendered frontends.
              </p>
              <div className="flex justify-center mt-6">
                <a
                  href="https://appwrite.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium rounded-md hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-lg shadow-pink-900/30 hover:shadow-pink-900/40 transform hover:-translate-y-0.5"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-pink-100 mb-6 text-center">
            Repository Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div className="bg-white dark:bg-[#261A22] rounded-lg shadow-lg overflow-hidden">
              <LatestRelease owner="appwrite" repo="appwrite" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-[#261A22] rounded-lg shadow-lg overflow-hidden">
              <ContributorsList owner="appwrite" repo="appwrite" />
            </div>
            <div className="bg-white dark:bg-[#261A22] rounded-lg shadow-lg overflow-hidden">
              <RecentPullRequests owner="appwrite" repo="appwrite" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
