import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineStatus } from './store/slices/appSlice'
import Layout from './components/Layout'
import Home from './pages/Home'
import Banking from './pages/Banking'
import Calculator from './pages/Calculator'
import Schemes from './pages/Schemes'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const dispatch = useDispatch()
  const { isOnline } = useSelector((state) => state.app)

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => dispatch(setOnlineStatus(true))
    const handleOffline = () => dispatch(setOnlineStatus(false))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial online status check
    dispatch(setOnlineStatus(navigator.onLine))

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [dispatch])

  return (
    <div className="App min-h-screen bg-gray-50">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          <span className="text-sm font-medium">
            📡 You are offline. Some features may not work.
          </span>
        </div>
      )}
    </div>
  )
}

export default App