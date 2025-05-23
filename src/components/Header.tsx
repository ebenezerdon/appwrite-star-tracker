import React from 'react';
import { Github } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-gradient-to-r dark:from-[#19191C] dark:to-[#231A23] border-b border-gray-200 dark:border-pink-500/30 relative backdrop-blur-sm dark:bg-opacity-90 dark:shadow-lg dark:shadow-pink-900/10">
      {/* Decorative header glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent blur-sm"></div>
      <div className="flex items-center">
        <Github className="h-6 w-6 text-pink-600 dark:text-pink-400 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800 dark:text-pink-100 relative" style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.2)' }}>✨ Appwrite Star Gazer</h1>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-[#2A1A22] text-gray-700 dark:text-pink-200 hover:bg-gray-200 dark:hover:bg-[#3A1A2A] transition-colors duration-200"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <a 
          href="https://github.com/appwrite/appwrite" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 rounded-md bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-500 hover:to-rose-500 transition-all duration-300 flex items-center text-sm shadow-md shadow-pink-900/20 hover:shadow-pink-900/30 relative overflow-hidden group"
        >
          <Github className="h-4 w-4 mr-2" />
          View on GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;