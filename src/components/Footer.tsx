import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
          © {new Date().getFullYear()} Appwrite Star Tracker
        </div>
        
        <div className="flex space-x-4">
          <a 
            href="https://appwrite.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Appwrite Website
          </a>
          <a 
            href="https://github.com/appwrite/appwrite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            GitHub Repository
          </a>
          <a 
            href="https://twitter.com/appwrite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;