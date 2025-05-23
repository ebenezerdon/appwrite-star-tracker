import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 bg-white dark:bg-gradient-to-r dark:from-[#19191C] dark:to-[#231A23] border-t border-gray-200 dark:border-pink-900/20 mt-auto relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent blur-sm"></div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-pink-200/80 mb-2 sm:mb-0">
          © {new Date().getFullYear()} Appwrite Star Tracker
        </div>
        
        <div className="flex space-x-4">
          <a 
            href="https://appwrite.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors relative group"
          >
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-pink-500/50 group-hover:w-full transition-all duration-300"></span>
            Appwrite Website
          </a>
          <a 
            href="https://github.com/appwrite/appwrite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors relative group"
          >
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-pink-500/50 group-hover:w-full transition-all duration-300"></span>
            GitHub Repository
          </a>
          <a 
            href="https://twitter.com/appwrite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors relative group"
          >
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-pink-500/50 group-hover:w-full transition-all duration-300"></span>
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;