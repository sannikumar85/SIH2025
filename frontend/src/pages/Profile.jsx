import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {currentLanguage === 'hi' ? 'प्रोफाइल' : 'Profile'}
      </h1>
      <p className="text-gray-600">
        {currentLanguage === 'hi' ? 'जल्द ही आ रहा है...' : 'Coming soon...'}
      </p>
    </div>
  )
}

export default Profile