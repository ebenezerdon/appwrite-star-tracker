import React, { useState, useEffect } from 'react';
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
    <div className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
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
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
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
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">About Appwrite</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Appwrite is an open-source backend server that helps developers build applications by providing ready-to-use APIs for authentication, database, storage, functions, and more.
            </p>
            <div className="flex justify-center mt-4">
              <a 
                href="https://appwrite.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
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