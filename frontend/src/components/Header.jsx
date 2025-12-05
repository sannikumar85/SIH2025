import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaLanguage, FaUser, FaBars, FaTimes, FaWifi } from 'react-icons/fa'
import { setLanguage } from '../store/slices/languageSlice'
import { toggleSidebar } from '../store/slices/appSlice'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { current: currentLanguage } = useSelector((state) => state.language)
  const { isOnline } = useSelector((state) => state.app)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'hi' : 'en'
    dispatch(setLanguage(newLang))
  }

  const getPageTitle = () => {
    const titles = {
      '/': currentLanguage === 'hi' ? 'होम' : 'Home',
      '/banking': currentLanguage === 'hi' ? 'बैंकिंग बेसिक्स' : 'Banking Basics',
      '/calculator': currentLanguage === 'hi' ? 'लोन कैलकुलेटर' : 'Loan Calculator',
      '/schemes': currentLanguage === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes',
      '/chat': currentLanguage === 'hi' ? 'AI सहायक' : 'AI Assistant',
      '/profile': currentLanguage === 'hi' ? 'प्रोफाइल' : 'Profile'
    }
    return titles[location.pathname] || 'Vittiya Mitra'
  }

  const navigationItems = [
    { 
      path: '/', 
      label: currentLanguage === 'hi' ? 'होम' : 'Home',
      icon: '🏠' 
    },
    { 
      path: '/banking', 
      label: currentLanguage === 'hi' ? 'बैंकिंग' : 'Banking',
      icon: '🏦' 
    },
    { 
      path: '/calculator', 
      label: currentLanguage === 'hi' ? 'कैलकुलेटर' : 'Calculator',
      icon: '🧮' 
    },
    { 
      path: '/schemes', 
      label: currentLanguage === 'hi' ? 'योजनाएं' : 'Schemes',
      icon: '🏛️' 
    },
    { 
      path: '/chat', 
      label: currentLanguage === 'hi' ? 'चैट' : 'Chat',
      icon: '💬' 
    }
  ]

  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    Vittiya Mitra
                  </h1>
                  <p className="text-xs text-gray-600">
                    {currentLanguage === 'hi' ? 'वित्तीय मित्र' : 'Financial Friend'}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Online status indicator */}
              <div className="hidden sm:flex items-center">
                {isOnline ? (
                  <FaWifi className="text-green-500 w-4 h-4" title="Online" />
                ) : (
                  <FaWifi className="text-red-500 w-4 h-4" title="Offline" />
                )}
              </div>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                title="Change Language"
              >
                <FaLanguage className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'hi' ? 'हिं' : 'EN'}
                </span>
              </button>

              {/* Profile */}
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === '/profile'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaUser className="w-4 h-4" />
                {isAuthenticated && (
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || 'Profile'}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Page title for mobile */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h2>
        </div>
      </div>
    </>
  )
}

export default Header