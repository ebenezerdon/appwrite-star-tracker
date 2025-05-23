import React, { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  starCount: number
}

const ShareButton: React.FC<ShareButtonProps> = ({ starCount }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const shareText = `Appwrite just reached ${starCount.toLocaleString()} stars on GitHub! Check it out: https://github.com/appwrite/appwrite`

  const handleShare = async () => {
    // Check if the Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appwrite GitHub stars',
          text: shareText,
          url: 'https://github.com/appwrite/appwrite',
        })
      } catch (error) {
        console.error('Error sharing:', error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    })
  }

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-pink-700 text-white text-xs rounded whitespace-nowrap shadow-md animate-fadeIn">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default ShareButton
