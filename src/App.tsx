import { useState, useEffect } from 'react';
import BackgroundPattern from './components/BackgroundPattern';
import { useGitHubStats } from './services/github';
import StarCounter from './components/StarCounter';
import Header from './components/Header';
import Footer from './components/Footer';
import StatsCard from './components/StatsCard';
import ShareButton from './components/ShareButton';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize dark mode based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Apply theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Fetch GitHub stats for Appwrite
  const { 
    starCount, 
    forkCount, 
    watcherCount, 
    lastUpdated, 
    isLoading, 
    error 
  } = useGitHubStats({
    owner: 'appwrite',
    repo: 'appwrite',
    refreshInterval: 30000 // Refresh every 30 seconds
  });

  // Update document title with star count
  useEffect(() => {
    if (starCount > 0) {
      document.title = `${starCount.toLocaleString()} Stars - Appwrite Tracker`;
    }
  }, [starCount]);

  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 dark:bg-[#19191C] transition-colors duration-500 relative overflow-hidden`}>
      <BackgroundPattern />
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      {/* Pink glow effect at the top */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent blur-xl"></div>
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
              Live GitHub Star Counter
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              Track the real-time star count for Appwrite, the open-source backend server for web, mobile, and Flutter developers.
            </p>
          </div>
          
          <div className="mb-8">
            <StarCounter 
              count={starCount} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard 
              forkCount={forkCount}
              watcherCount={watcherCount}
              lastUpdated={lastUpdated}
              isLoading={isLoading}
            />
            
            <div className="bg-white dark:bg-gradient-to-br dark:from-[#19191C] dark:via-[#261A22] dark:to-[#2A1A22] rounded-xl shadow-md p-6 border border-gray-100 dark:border-pink-500/20 dark:shadow-pink-900/20 dark:shadow-lg flex flex-col justify-between backdrop-blur-sm dark:bg-opacity-80 transition-all duration-300 hover:dark:border-pink-500/30 group">
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Share This</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Share Appwrite's GitHub star count with your network.
                </p>
              </div>
              
              <div className="flex justify-center">
                <ShareButton starCount={starCount} />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gradient-to-r dark:from-[#19191C] dark:to-[#2D1A24] rounded-xl shadow-md p-6 border border-gray-100 dark:border-pink-500/20 dark:shadow-pink-900/20 dark:shadow-lg mb-8 backdrop-blur-sm dark:bg-opacity-80 transition-all duration-300 hover:dark:border-pink-500/30 relative overflow-hidden group">
            {/* Decorative element */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all duration-500"></div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">About Appwrite</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Appwrite is an open-source backend server that helps developers build applications by providing ready-to-use APIs for authentication, database, storage, functions, and more.
            </p>
            <div className="flex justify-center mt-4">
              <a 
                href="https://appwrite.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;