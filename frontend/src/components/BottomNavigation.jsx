import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaHome, FaUniversity, FaCalculator, FaBuilding, FaComments } from 'react-icons/fa'

const BottomNavigation = () => {
  const location = useLocation()
  const { current: currentLanguage } = useSelector((state) => state.language)

  const navItems = [
    {
      path: '/',
      icon: FaHome,
      label: currentLanguage === 'hi' ? 'होम' : 'Home'
    },
    {
      path: '/banking',
      icon: FaUniversity,
      label: currentLanguage === 'hi' ? 'बैंकिंग' : 'Banking'
    },
    {
      path: '/calculator',
      icon: FaCalculator,
      label: currentLanguage === 'hi' ? 'कैलकुलेटर' : 'Calculator'
    },
    {
      path: '/schemes',
      icon: FaBuilding,
      label: currentLanguage === 'hi' ? 'योजना' : 'Schemes'
    },
    {
      path: '/chat',
      icon: FaComments,
      label: currentLanguage === 'hi' ? 'चैट' : 'Chat'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'animate-bounce-subtle' : ''}`} />
              <span className="text-xs font-medium truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation