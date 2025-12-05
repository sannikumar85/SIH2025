import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Confetti from 'react-confetti'
import CountUp from 'react-countup'
import { 
  Rocket, 
  Bell, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  Globe, 
  WifiOff, 
  MapPin, 
  List, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Send, 
  Loader2, 
  Share2, 
  X, 
  ChevronDown, 
  Lock,
  Users,
  Grid,
  Calendar,
  Building,
  ClipboardCheck,
  Languages,
  Route,
  FileCheck,
  Sparkles,
  Heart,
  Gift,
  GraduationCap,
  Home,
  TrendingUp,
  Shield
} from 'lucide-react'
import toast from 'react-hot-toast'

const Schemes = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [openFaq, setOpenFaq] = useState(null)
  const [waitlistCount, setWaitlistCount] = useState(247)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const content = {
    en: {
      hero: {
        title: "Something Exciting is Coming!",
        subtitle: "15+ Government Schemes • Financial Freedom • Easy Access",
        cta: "Join Waitlist"
      },
      features: [
        {
          icon: FileText,
          title: "15+ Government Schemes",
          description: "Access 15+ schemes across agriculture, business, education & more",
          color: "from-purple-500 to-pink-500"
        },
        {
          icon: ClipboardCheck,
          title: "Smart Eligibility Checker",
          description: "Find schemes you're eligible for in seconds",
          color: "from-blue-500 to-cyan-500"
        },
        {
          icon: Languages,
          title: "Multilingual Support",
          description: "Available in Hindi, English, and more regional languages",
          color: "from-green-500 to-emerald-500"
        },
        {
          icon: WifiOff,
          title: "Offline Access",
          description: "Works without internet - access schemes anytime, anywhere",
          color: "from-orange-500 to-red-500"
        },
        {
          icon: Route,
          title: "Step-by-Step Guidance",
          description: "Get detailed application process for each scheme",
          color: "from-indigo-500 to-purple-500"
        },
        {
          icon: FileCheck,
          title: "Document Checklist",
          description: "Never miss a required document again",
          color: "from-pink-500 to-rose-500"
        }
      ],
      schemes: [
        { name: "PM-KISAN", category: "Agriculture", color: "bg-green-500", icon: Sparkles },
        { name: "Mudra Loan", category: "Business", color: "bg-blue-500", icon: TrendingUp },
        { name: "Jan Dhan Yojana", category: "Banking", color: "bg-purple-500", icon: Shield },
        { name: "Atal Pension Yojana", category: "Pension", color: "bg-orange-500", icon: Heart },
        { name: "PM Awas Yojana", category: "Housing", color: "bg-indigo-500", icon: Home },
        { name: "Sukanya Samriddhi", category: "Education", color: "bg-pink-500", icon: GraduationCap },
        { name: "Pradhan Mantri Fasal Bima", category: "Insurance", color: "bg-teal-500", icon: Shield },
        { name: "MSME Schemes", category: "Business", color: "bg-cyan-500", icon: Building }
      ],
      form: {
        title: "Join the Waitlist",
        subtitle: "Be the first to access 15+ government schemes",
        name: "Your Name",
        namePlaceholder: "Enter your name",
        email: "Email Address",
        emailPlaceholder: "your@email.com",
        phone: "Phone Number",
        phonePlaceholder: "+91 XXXXX XXXXX",
        language: "Language Preference",
        categories: "Interested Categories",
        categoryOptions: ["Agriculture", "Business", "Education", "Housing", "Pension", "Women", "Youth", "Health", "All"],
        occupation: "Occupation",
        occupationOptions: ["Farmer", "Self-employed", "Salaried", "Student", "Housewife", "Senior Citizen", "Other"],
        state: "State",
        submit: "Join Waitlist",
        submitting: "Joining..."
      },
      success: {
        title: "Welcome to the Waitlist!",
        position: "You're",
        inLine: "in line",
        message: "We'll notify you via email when we launch",
        share: "Share",
        close: "Close"
      },
      stats: [
        { label: "People Waiting", icon: Users },
        { label: "Schemes Ready", value: "15+", icon: FileText },
        { label: "Categories", value: "8", icon: Grid },
        { label: "Days Till Launch", value: "30", icon: Calendar }
      ],
      faqs: [
        {
          q: "What is this feature?",
          a: "Government Schemes database with 15+ schemes, eligibility checker, and step-by-step application guidance."
        },
        {
          q: "When will it launch?",
          a: "We're working hard to launch in the next 30 days. Join the waitlist to be the first to know!"
        },
        {
          q: "Will it be free?",
          a: "Yes! This feature is completely free for all users."
        },
        {
          q: "Which languages will be supported?",
          a: "Initially Hindi and English, with more regional languages coming soon."
        },
        {
          q: "How will I be notified?",
          a: "We'll send you an email as soon as the feature goes live."
        },
        {
          q: "What schemes will be included?",
          a: "PM-KISAN, Mudra Loan, Jan Dhan, Atal Pension, PM Awas, Sukanya Samriddhi, and many more across different categories."
        }
      ],
      footer: {
        title: "Don't Miss Out!",
        subtitle: "Be among the first to access 15+ government schemes",
        cta: "Join Waitlist Now"
      }
    },
    hi: {
      hero: {
        title: "कुछ रोमांचक आ रहा है!",
        subtitle: "15+ सरकारी योजनाएं • वित्तीय स्वतंत्रता • आसान पहुंच",
        cta: "प्रतीक्षा सूची में शामिल हों"
      },
      features: [
        {
          icon: FileText,
          title: "15+ सरकारी योजनाएं",
          description: "कृषि, व्यवसाय, शिक्षा और अधिक में 15+ योजनाओं तक पहुंच",
          color: "from-purple-500 to-pink-500"
        },
        {
          icon: ClipboardCheck,
          title: "स्मार्ट पात्रता जांचकर्ता",
          description: "सेकंड में पता करें कि आप किन योजनाओं के लिए पात्र हैं",
          color: "from-blue-500 to-cyan-500"
        },
        {
          icon: Languages,
          title: "बहुभाषी समर्थन",
          description: "हिंदी, अंग्रेजी और अधिक क्षेत्रीय भाषाओं में उपलब्ध",
          color: "from-green-500 to-emerald-500"
        },
        {
          icon: WifiOff,
          title: "ऑफ़लाइन एक्सेस",
          description: "इंटरनेट के बिना काम करता है - कभी भी, कहीं भी योजनाओं तक पहुंच",
          color: "from-orange-500 to-red-500"
        },
        {
          icon: Route,
          title: "चरण-दर-चरण मार्गदर्शन",
          description: "प्रत्येक योजना के लिए विस्तृत आवेदन प्रक्रिया प्राप्त करें",
          color: "from-indigo-500 to-purple-500"
        },
        {
          icon: FileCheck,
          title: "दस्तावेज़ चेकलिस्ट",
          description: "कभी भी आवश्यक दस्तावेज़ न चूकें",
          color: "from-pink-500 to-rose-500"
        }
      ],
      schemes: [
        { name: "पीएम-किसान", category: "कृषि", color: "bg-green-500", icon: Sparkles },
        { name: "मुद्रा लोन", category: "व्यवसाय", color: "bg-blue-500", icon: TrendingUp },
        { name: "जन धन योजना", category: "बैंकिंग", color: "bg-purple-500", icon: Shield },
        { name: "अटल पेंशन योजना", category: "पेंशन", color: "bg-orange-500", icon: Heart },
        { name: "पीएम आवास योजना", category: "आवास", color: "bg-indigo-500", icon: Home },
        { name: "सुकन्या समृद्धि", category: "शिक्षा", color: "bg-pink-500", icon: GraduationCap },
        { name: "प्रधानमंत्री फसल बीमा", category: "बीमा", color: "bg-teal-500", icon: Shield },
        { name: "एमएसएमई योजनाएं", category: "व्यवसाय", color: "bg-cyan-500", icon: Building }
      ],
      form: {
        title: "प्रतीक्षा सूची में शामिल हों",
        subtitle: "15+ सरकारी योजनाओं तक पहुँचने वाले पहले व्यक्ति बनें",
        name: "आपका नाम",
        namePlaceholder: "अपना नाम दर्ज करें",
        email: "ईमेल पता",
        emailPlaceholder: "your@email.com",
        phone: "फोन नंबर",
        phonePlaceholder: "+91 XXXXX XXXXX",
        language: "भाषा प्राथमिकता",
        categories: "रुचि की श्रेणियाँ",
        categoryOptions: ["कृषि", "व्यवसाय", "शिक्षा", "आवास", "पेंशन", "महिला", "युवा", "स्वास्थ्य", "सभी"],
        occupation: "व्यवसाय",
        occupationOptions: ["किसान", "स्व-रोजगार", "वेतनभोगी", "छात्र", "गृहिणी", "वरिष्ठ नागरिक", "अन्य"],
        state: "राज्य",
        submit: "शामिल हों",
        submitting: "शामिल हो रहे हैं..."
      },
      success: {
        title: "प्रतीक्षा सूची में आपका स्वागत है!",
        position: "आप",
        inLine: "वें स्थान पर हैं",
        message: "जब हम लॉन्च करेंगे तो हम आपको ईमेल से सूचित करेंगे",
        share: "साझा करें",
        close: "बंद करें"
      },
      stats: [
        { label: "प्रतीक्षा में", icon: Users },
        { label: "योजनाएं तैयार", value: "15+", icon: FileText },
        { label: "श्रेणियां", value: "8", icon: Grid },
        { label: "लॉन्च तक दिन", value: "30", icon: Calendar }
      ],
      faqs: [
        {
          q: "यह फीचर क्या है?",
          a: "15+ योजनाओं, पात्रता जांचकर्ता और चरण-दर-चरण आवेदन मार्गदर्शन के साथ सरकारी योजनाओं का डेटाबेस।"
        },
        {
          q: "यह कब लॉन्च होगा?",
          a: "हम अगले 30 दिनों में लॉन्च करने के लिए कड़ी मेहनत कर रहे हैं। सबसे पहले जानने के लिए प्रतीक्षा सूची में शामिल हों!"
        },
        {
          q: "क्या यह मुफ्त होगा?",
          a: "हाँ! यह फीचर सभी उपयोगकर्ताओं के लिए पूरी तरह से मुफ्त है।"
        },
        {
          q: "कौन सी भाषाएँ समर्थित होंगी?",
          a: "शुरुआत में हिंदी और अंग्रेजी, जल्द ही अधिक क्षेत्रीय भाषाएँ आ रही हैं।"
        },
        {
          q: "मुझे कैसे सूचित किया जाएगा?",
          a: "जैसे ही फीचर लाइव होगा हम आपको एक ईमेल भेजेंगे।"
        },
        {
          q: "कौन सी योजनाएं शामिल होंगी?",
          a: "पीएम-किसान, मुद्रा लोन, जन धन, अटल पेंशन, पीएम आवास, सुकन्या समृद्धि, और विभिन्न श्रेणियों में कई और।"
        }
      ],
      footer: {
        title: "छूट न जाएं!",
        subtitle: "15+ सरकारी योजनाओं तक पहुँचने वाले पहले लोगों में शामिल हों",
        cta: "अभी प्रतीक्षा सूची में शामिल हों"
      }
    }
  }

  const lang = content[currentLanguage] || content.en

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const position = waitlistCount + 1
      setWaitlistPosition(position)
      setWaitlistCount(position)
      setShowSuccess(true)
      setShowWaitlistForm(false)
      reset()
      setSelectedCategories([])
      toast.success(currentLanguage === 'hi' ? 'सफलतापूर्वक प्रतीक्षा सूची में शामिल हुए!' : 'Successfully joined the waitlist!')
    } catch (error) {
      toast.error(currentLanguage === 'hi' ? 'कुछ गलत हो गया!' : 'Something went wrong!')
    }
  }

  const scrollToForm = () => {
    setShowWaitlistForm(true)
    setTimeout(() => {
      document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '6s' }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl">
              <Rocket className="w-12 h-12 text-white animate-bounce-slow" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              {lang.hero.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 font-light"
          >
            {lang.hero.subtitle}
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              { label: currentLanguage === 'hi' ? 'दिन' : 'Days', value: 30 },
              { label: currentLanguage === 'hi' ? 'घंटे' : 'Hours', value: 12 },
              { label: currentLanguage === 'hi' ? 'मिनट' : 'Mins', value: 45 },
              { label: currentLanguage === 'hi' ? 'सेकंड' : 'Secs', value: 30 }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167, 139, 250, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all animate-pulse-slow"
          >
            <Bell className="w-6 h-6" />
            {lang.hero.cta}
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentLanguage === 'hi' ? 'आने वाली विशेषताएं' : 'Upcoming Features'}
            </h2>
            <p className="text-xl text-white/70">
              {currentLanguage === 'hi' ? 'शक्तिशाली उपकरण जो आपकी वित्तीय यात्रा को आसान बनाते हैं' : 'Powerful tools that make your financial journey easier'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lang.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-4">{feature.description}</p>
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm text-purple-200 font-semibold">
                    {currentLanguage === 'hi' ? 'जल्द आ रहा है' : 'Coming Soon'}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Scheme Preview Carousel */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentLanguage === 'hi' ? 'योजनाओं की झलक' : 'Schemes Preview'}
            </h2>
            <p className="text-xl text-white/70">
              {currentLanguage === 'hi' ? 'लॉन्च पर अनलॉक करें' : 'Unlock at launch'}
            </p>
          </motion.div>

          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
            {lang.schemes.map((scheme, index) => {
              const Icon = scheme.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="min-w-[280px] h-[220px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 relative overflow-hidden flex-shrink-0 group"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 ${scheme.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  {/* Lock Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                    >
                      <Lock className="w-8 h-8 text-white/50" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${scheme.color} rounded-lg mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{scheme.name}</h3>
                    <span className={`inline-block px-3 py-1 ${scheme.color} rounded-full text-xs text-white font-semibold`}>
                      {scheme.category}
                    </span>
                  </div>

                  {/* Unlock Text */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm font-medium">
                      {currentLanguage === 'hi' ? '🔓 लॉन्च पर अनलॉक' : '🔓 Unlock at launch'}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* More Coming Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="min-w-[280px] h-[220px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-dashed border-white/30 flex items-center justify-center flex-shrink-0"
            >
              <div className="text-center">
                <Gift className="w-12 h-12 text-white/70 mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">
                  {currentLanguage === 'hi' ? 'और भी आ रहा है...' : 'More coming...'}
                </p>
                <p className="text-white/60 text-sm">
                  {currentLanguage === 'hi' ? '7+ अधिक योजनाएं' : '7+ more schemes'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist-form" className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showWaitlistForm && !showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWaitlistForm(true)}
                  className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  <Bell className="w-7 h-7" />
                  {lang.form.title}
                  <ArrowRight className="w-7 h-7" />
                </motion.button>
              </motion.div>
            )}

            {showWaitlistForm && !showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {lang.form.title}
                  </h2>
                  <p className="text-white/70 text-lg">{lang.form.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      {lang.form.name}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        {...register('name', { required: true, minLength: 2 })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder={lang.form.namePlaceholder}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {currentLanguage === 'hi' ? 'नाम आवश्यक है (न्यूनतम 2 अक्षर)' : 'Name is required (min 2 characters)'}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      {lang.form.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder={lang.form.emailPlaceholder}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {currentLanguage === 'hi' ? 'मान्य ईमेल आवश्यक है' : 'Valid email is required'}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      {lang.form.phone}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="tel"
                        {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder={lang.form.phonePlaceholder}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {currentLanguage === 'hi' ? 'मान्य फोन नंबर आवश्यक है (10 अंक)' : 'Valid phone number required (10 digits)'}
                      </p>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      {lang.form.categories}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {lang.form.categoryOptions.map((category, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleCategory(category)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            selectedCategories.includes(category)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occupation Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      {lang.form.occupation}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <select
                        {...register('occupation', { required: true })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">
                          {currentLanguage === 'hi' ? 'चुनें' : 'Select'}
                        </option>
                        {lang.form.occupationOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-800">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      {lang.form.state}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <select
                        {...register('state', { required: true })}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">
                          {currentLanguage === 'hi' ? 'चुनें' : 'Select'}
                        </option>
                        {indianStates.map((state, i) => (
                          <option key={i} value={state} className="bg-slate-800">
                            {state}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        {lang.form.submitting}
                      </>
                    ) : (
                      <>
                        {lang.form.submit}
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setShowWaitlistForm(false)}
                    className="w-full py-3 text-white/70 hover:text-white transition-colors text-center"
                  >
                    {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                </form>
              </motion.div>
            )}

            {showSuccess && (
              <>
                <Confetti
                  width={windowSize.width}
                  height={windowSize.height}
                  recycle={false}
                  numberOfPieces={500}
                  gravity={0.3}
                />
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20 shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500"
                  >
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {lang.success.title}
                  </h3>
                  <p className="text-xl text-white/90 mb-2">
                    {lang.success.position}{' '}
                    <span className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      #{waitlistPosition}
                    </span>{' '}
                    {lang.success.inLine}
                  </p>
                  <p className="text-white/70 mb-8">
                    {lang.success.message}
                  </p>
                  
                  {/* Share Buttons */}
                  <div className="flex gap-4 justify-center mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-semibold"
                    >
                      <Share2 className="w-5 h-5" />
                      {lang.success.share}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSuccess(false)}
                      className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-semibold"
                    >
                      {lang.success.close}
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {lang.stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center group hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {index === 0 ? (
                      <CountUp end={waitlistCount} duration={2} separator="," />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm md:text-base text-white/70 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {currentLanguage === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-white/70">
              {currentLanguage === 'hi' ? 'आपके सवालों के जवाब' : 'Get your questions answered'}
            </p>
          </motion.div>

          <div className="space-y-4">
            {lang.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-white/70 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-white/70 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {lang.footer.title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {lang.footer.subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all"
          >
            <Bell className="w-6 h-6" />
            {lang.footer.cta}
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer Note */}
      <div className="relative py-8 px-6 text-center">
        <p className="text-white/50 text-sm">
          {currentLanguage === 'hi' 
            ? '© 2025 वित्तीय साक्षरता ऐप. सभी अधिकार सुरक्षित.' 
            : '© 2025 Financial Literacy App. All rights reserved.'}
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Schemes