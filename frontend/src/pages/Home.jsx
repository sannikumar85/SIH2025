import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  FaUniversity, 
  FaCalculator, 
  FaBuilding, 
  FaComments, 
  FaChartLine, 
  FaUsers, 
  FaAward, 
  FaShieldAlt,
  FaMobile,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaCheckCircle,
  FaPhoneAlt,
  FaGlobe,
  FaBookOpen
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const Home = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)
  const { isOnline } = useSelector((state) => state.app)

  const features = [
    {
      icon: FaUniversity,
      title: currentLanguage === 'hi' ? 'बैंकिंग बेसिक्स' : 'Banking Basics',
      description: currentLanguage === 'hi' 
        ? 'खाता खोलना, KYC, डिजिटल बैंकिंग की जानकारी'
        : 'Account opening, KYC, digital banking information',
      path: '/banking',
      color: 'from-blue-500 to-blue-600',
      badge: 'Popular'
    },
    {
      icon: FaCalculator,
      title: currentLanguage === 'hi' ? 'लोन कैलकुलेटर' : 'Loan Calculator',
      description: currentLanguage === 'hi'
        ? 'EMI, ब्याज दर, और लोन की पूरी गणना'
        : 'EMI, interest rate, and complete loan calculations',
      path: '/calculator',
      color: 'from-green-500 to-green-600',
      badge: 'Free Tool'
    },
    {
      icon: FaBuilding,
      title: currentLanguage === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes',
      description: currentLanguage === 'hi'
        ? 'PM-KISAN, जन धन, मुद्रा लोन और अन्य योजनाएं'
        : 'PM-KISAN, Jan Dhan, Mudra Loan and other schemes',
      path: '/schemes',
      color: 'from-purple-500 to-purple-600',
      badge: 'Updated'
    },
    {
      icon: FaComments,
      title: currentLanguage === 'hi' ? 'AI सहायक' : 'AI Assistant',
      description: currentLanguage === 'hi'
        ? 'Gemini AI से वित्तीय सवालों के तुरंत जवाब'
        : 'Instant answers to financial questions with Gemini AI',
      path: '/chat',
      color: 'from-pink-500 to-pink-600',
      badge: 'AI Powered'
    }
  ]

  const stats = [
    {
      icon: FaUsers,
      value: '50,000+',
      label: currentLanguage === 'hi' ? 'ग्रामीण परिवारों की सहायता' : 'Rural Families Helped',
      color: 'text-blue-600'
    },
    {
      icon: FaChartLine,
      value: '₹100+',
      label: currentLanguage === 'hi' ? 'करोड़ लोन मंजूर' : 'Crore Loans Approved',
      color: 'text-green-600'
    },
    {
      icon: FaAward,
      value: '1000+',
      label: currentLanguage === 'hi' ? 'वित्तीय शब्द समझाए गए' : 'Financial Terms Explained',
      color: 'text-purple-600'
    },
    {
      icon: FaGraduationCap,
      value: '24/7',
      label: currentLanguage === 'hi' ? 'AI सहायता उपलब्ध' : 'AI Support Available',
      color: 'text-pink-600'
    }
  ]

  const achievements = [
    {
      icon: FaCheckCircle,
      title: currentLanguage === 'hi' ? 'डिजिटल इंडिया मिशन' : 'Digital India Mission',
      description: currentLanguage === 'hi' ? 'भारत सरकार द्वारा प्रमाणित' : 'Certified by Government of India'
    },
    {
      icon: FaShieldAlt,
      title: currentLanguage === 'hi' ? 'सुरक्षित और विश्वसनीय' : 'Safe & Trusted',
      description: currentLanguage === 'hi' ? 'बैंक-ग्रेड सिक्यूरिटी' : 'Bank-grade security'
    },
    {
      icon: FaMobile,
      title: currentLanguage === 'hi' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly',
      description: currentLanguage === 'hi' ? 'सभी डिवाइस पर काम करता है' : 'Works on all devices'
    }
  ]

  const quickActions = [
    {
      title: currentLanguage === 'hi' ? 'आज ही खाता खोलें' : 'Open Account Today',
      description: currentLanguage === 'hi' ? 'सिर्फ आधार कार्ड से' : 'With just Aadhaar card',
      link: '/banking',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: currentLanguage === 'hi' ? 'EMI कैलकुलेटर' : 'EMI Calculator',
      description: currentLanguage === 'hi' ? 'तुरंत गणना करें' : 'Calculate instantly',
      link: '/calculator',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      title: currentLanguage === 'hi' ? 'योजना खोजें' : 'Find Schemes',
      description: currentLanguage === 'hi' ? 'आपके लिए उपयुक्त' : 'Suitable for you',
      link: '/schemes',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section with Government-style Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white rounded-2xl p-8 md:p-12 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='1' fill='white' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grain)'/%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10">
          {/* Government Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <FaUniversity className="w-6 h-6 text-blue-900" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {currentLanguage === 'hi' ? 'वित्तीय मित्र' : 'Vittiya Mitra'}
                </h1>
                <p className="text-blue-100 text-lg">
                  {currentLanguage === 'hi' ? 'भारत सरकार की डिजिटल पहल' : 'Government of India Digital Initiative'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {currentLanguage === 'hi'
                ? 'ग्रामीण भारत के लिए AI-पावर्ड वित्तीय साक्षरता'
                : 'AI-Powered Financial Literacy for Rural India'}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {currentLanguage === 'hi'
                ? 'अपनी भाषा में बैंकिंग, लोन, बीमा और सरकारी योजनाओं की पूरी जानकारी प्राप्त करें'
                : 'Get complete information about banking, loans, insurance and government schemes in your language'}
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-blue-100">
                  {isOnline
                    ? (currentLanguage === 'hi' ? 'ऑनलाइन सेवा सक्रिय' : 'Online Service Active')
                    : (currentLanguage === 'hi' ? 'ऑफलाइन मोड' : 'Offline Mode')
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <FaGlobe className="w-4 h-4" />
                <span>{currentLanguage === 'hi' ? 'हिंदी + English' : 'Hindi + English'}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <FaPhoneAlt className="w-4 h-4" />
                <span>{currentLanguage === 'hi' ? 'वॉयस सपोर्ट' : 'Voice Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {currentLanguage === 'hi' ? 'तुरंत शुरू करें' : 'Quick Start'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link to={action.link}>
                <div className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${action.color}`}>
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-sm opacity-80">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Feature Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? 'हमारी सेवाएं' : 'Our Services'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Link to={feature.path}>
                <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group overflow-hidden">
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 bg-gradient-to-r ${feature.color} text-white text-xs rounded-full font-medium`}>
                    {feature.badge}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <span className="text-gray-600 text-sm">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? 'हमारा प्रभाव' : 'Our Impact'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              className="text-center bg-white rounded-xl p-6 shadow-md"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements & Trust Indicators */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? 'क्यों चुनें वित्तीय मित्र?' : 'Why Choose Vittiya Mitra?'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Daily Tip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <FaBookOpen className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              {currentLanguage === 'hi' ? '💡 आज की वित्तीय सुझाव' : '💡 Today\'s Financial Tip'}
            </h3>
            <p className="text-yellow-800 leading-relaxed">
              {currentLanguage === 'hi'
                ? 'हमेशा बैंक से लोन लें, साहूकारों से नहीं। बैंक लोन में कम ब्याज दर होती है और यह पूरी तरह सुरक्षित होता है। PM-KISAN योजना के तहत किसानों को ₹6,000 सालाना मिलता है।'
                : 'Always take loans from banks, not from moneylenders. Bank loans have lower interest rates and are completely safe. Under PM-KISAN scheme, farmers get ₹6,000 annually.'}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home