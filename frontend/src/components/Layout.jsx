import React from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import VoiceButton from './VoiceButton'

const Layout = ({ children }) => {
  const { isOnline } = useSelector((state) => state.app)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        {children}
      </main>
      
      {/* Bottom Navigation - Mobile */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
      
      {/* Floating Voice Button */}
      <VoiceButton />
      
      {/* Offline Status Bar */}
      {!isOnline && (
        <div className="fixed top-16 left-0 right-0 bg-amber-500 text-white text-center py-2 z-40">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              आप ऑफलाइन हैं | You are offline
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout