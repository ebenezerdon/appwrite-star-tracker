import React from 'react'
import { Twitter } from 'lucide-react'

interface ShareButtonProps {
  starCount: number
}

const ShareButton: React.FC<ShareButtonProps> = ({ starCount }) => {
  // Create share text for Twitter
  const shareText = `Appwrite just reached ${starCount.toLocaleString()} stars on GitHub! Check it out:`
  const shareUrl = 'https://appwrite.ebenezerdon.com'
  
  // Function to share directly to Twitter
  const shareToTwitter = () => {
    // Encode the text and URL for the Twitter share URL
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    // Create the Twitter share URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    
    // Open Twitter in a new window
    window.open(twitterShareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative">
      <button
        onClick={shareToTwitter}
        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Twitter className="w-4 h-4 mr-2" />
        Share
      </button>
    </div>
  )
}

export default ShareButton
