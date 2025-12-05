import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const NotFound = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">🤔</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentLanguage === 'hi' ? 'पेज नहीं मिला' : 'Page Not Found'}
        </h1>
        <p className="text-gray-600 mb-8">
          {currentLanguage === 'hi'
            ? 'क्षमा करें, आप जिस पेज की तलाश कर रहे हैं वह उपलब्ध नहीं है।'
            : 'Sorry, the page you are looking for is not available.'
          }
        </p>
        <a
          href="/"
          className="btn-primary inline-block"
        >
          {currentLanguage === 'hi' ? 'होम पर वापस जाएं' : 'Go Back Home'}
        </a>
      </div>
    </motion.div>
  )
}

export default NotFound