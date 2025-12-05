import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  FaUniversity, 
  FaIdCard, 
  FaCreditCard, 
  FaMobile, 
  FaShieldAlt, 
  FaChartLine,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaCalculator,
  FaHandHoldingUsd,
  FaLaptop,
  FaUserShield,
  FaArrowRight,
  FaAward
} from 'react-icons/fa'
import api from '../services/api'

const Banking = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)
  const [bankingTerms, setBankingTerms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBank, setSelectedBank] = useState(null)

  useEffect(() => {
    fetchBankingTerms()
  }, [])

  const fetchBankingTerms = async () => {
    try {
      const response = await api.get('/banking/terms')
      setBankingTerms(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch banking terms:', error)
      // Enhanced fallback data
      setBankingTerms([
        {
          _id: '1',
          term: 'KYC',
          hindi: 'केवाईसी',
          definition: 'Know Your Customer - Identity verification process required for all banking services',
          hindiDefinition: 'अपने ग्राहक को जानो - सभी बैंकिंग सेवाओं के लिए आवश्यक पहचान सत्यापन प्रक्रिया',
          category: 'basic',
          importance: 'high'
        },
        {
          _id: '2',
          term: 'NEFT',
          hindi: 'एनईएफटी',
          definition: 'National Electronic Funds Transfer - Electronic money transfer system',
          hindiDefinition: 'राष्ट्रीय इलेक्ट्रॉनिक फंड ट्रांसफर - इलेक्ट्रॉनिक पैसा भेजने की प्रणाली',
          category: 'digital',
          importance: 'high'
        },
        {
          _id: '3',
          term: 'EMI',
          hindi: 'ईएमआई',
          definition: 'Equated Monthly Installment - Fixed monthly payment for loans',
          hindiDefinition: 'समान मासिक किस्त - लोन के लिए निश्चित मासिक भुगतान',
          category: 'loans',
          importance: 'very-high'
        },
        {
          _id: '4',
          term: 'UPI',
          hindi: 'यूपीआई',
          definition: 'Unified Payments Interface - Instant digital payment system',
          hindiDefinition: 'एकीकृत भुगतान इंटरफेस - तत्काल डिजिटल भुगतान प्रणाली',
          category: 'digital',
          importance: 'very-high'
        },
        {
          _id: '5',
          term: 'CIBIL Score',
          hindi: 'सिबिल स्कोर',
          definition: 'Credit Information Bureau score (300-900) showing creditworthiness',
          hindiDefinition: 'क्रेडिट इंफॉर्मेशन ब्यूरो स्कोर (300-900) जो साख योग्यता दिखाता है',
          category: 'loans',
          importance: 'high'
        },
        {
          _id: '6',
          term: 'Fixed Deposit',
          hindi: 'सावधि जमा',
          definition: 'Time-bound deposit with guaranteed returns and fixed interest rate',
          hindiDefinition: 'निश्चित समय और ब्याज दर के साथ गारंटीशुदा रिटर्न वाली जमा',
          category: 'investment',
          importance: 'high'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const majorBanks = [
    {
      id: 'sbi',
      name: 'State Bank of India',
      hindi: 'भारतीय स्टेट बैंक',
      logo: '🏦',
      type: 'Government',
      branches: '22,000+',
      founded: '1955',
      headquarters: 'Mumbai',
      customerCare: '1800 1234',
      website: 'sbi.co.in',
      rating: 4.2,
      services: [
        {
          name: currentLanguage === 'hi' ? 'बचत खाता' : 'Savings Account',
          minBalance: '₹3,000',
          features: currentLanguage === 'hi' ? ['मुफ्त डेबिट कार्ड', 'नेट बैंकिंग', 'मोबाइल बैंकिंग'] : ['Free Debit Card', 'Net Banking', 'Mobile Banking']
        },
        {
          name: currentLanguage === 'hi' ? 'होम लोन' : 'Home Loan',
          interestRate: '8.50% onwards',
          features: currentLanguage === 'hi' ? ['90% तक फाइनेंसिंग', 'फ्लेक्सिबल EMI', 'कम प्रोसेसिंग फीस'] : ['Up to 90% financing', 'Flexible EMI', 'Low processing fee']
        },
        {
          name: currentLanguage === 'hi' ? 'व्यक्तिगत लोन' : 'Personal Loan',
          interestRate: '10.50% onwards',
          features: currentLanguage === 'hi' ? ['त्वरित अप्रूवल', '₹30 लाख तक', 'न्यूनतम दस्तावेज'] : ['Quick approval', 'Up to ₹30 lakh', 'Minimal documents']
        },
        {
          name: currentLanguage === 'hi' ? 'सावधि जमा' : 'Fixed Deposit',
          interestRate: '6.50% - 7.00%',
          features: currentLanguage === 'hi' ? ['प्रीमैच्योर विथड्रॉल', 'ऑटो रिन्यूअल', 'लोन अगेंस्ट FD'] : ['Premature withdrawal', 'Auto renewal', 'Loan against FD']
        }
      ],
      specialSchemes: [
        {
          name: currentLanguage === 'hi' ? 'जन धन योजना' : 'Jan Dhan Yojana',
          description: currentLanguage === 'hi' ? 'जीरो बैलेंस खाता + बीमा कवर' : 'Zero balance account + insurance cover'
        },
        {
          name: currentLanguage === 'hi' ? 'किसान क्रेडिट कार्ड' : 'Kisan Credit Card',
          description: currentLanguage === 'hi' ? 'किसानों के लिए विशेष क्रेडिट कार्ड' : 'Special credit card for farmers'
        }
      ]
    },
    {
      id: 'hdfc',
      name: 'HDFC Bank',
      hindi: 'एचडीएफसी बैंक',
      logo: '🏪',
      type: 'Private',
      branches: '6,000+',
      founded: '1994',
      headquarters: 'Mumbai',
      customerCare: '1800 2666',
      website: 'hdfcbank.com',
      rating: 4.5,
      services: [
        {
          name: currentLanguage === 'hi' ? 'डिजिटल सेविंग्स' : 'Digital Savings',
          minBalance: '₹10,000',
          features: currentLanguage === 'hi' ? ['प्रीमियम डेबिट कार्ड', 'फ्री NEFT/RTGS', '24x7 नेट बैंकिंग'] : ['Premium Debit Card', 'Free NEFT/RTGS', '24x7 Net Banking']
        },
        {
          name: currentLanguage === 'hi' ? 'होम लोन' : 'Home Loan',
          interestRate: '8.75% onwards',
          features: currentLanguage === 'hi' ? ['डिजिटल प्रोसेसिंग', 'फास्ट अप्रूवल', 'प्री-अप्रूवड ऑफर'] : ['Digital processing', 'Fast approval', 'Pre-approved offers']
        },
        {
          name: currentLanguage === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Card',
          interestRate: 'Low fees',
          features: currentLanguage === 'hi' ? ['रिवॉर्ड पॉइंट्स', 'कैशबैक ऑफर', 'EMI कन्वर्जन'] : ['Reward points', 'Cashback offers', 'EMI conversion']
        },
        {
          name: currentLanguage === 'hi' ? 'म्यूचुअल फंड' : 'Mutual Funds',
          interestRate: 'Market linked',
          features: currentLanguage === 'hi' ? ['SIP सुविधा', 'ऑनलाइन ट्रैकिंग', 'एक्सपर्ट सलाह'] : ['SIP facility', 'Online tracking', 'Expert advice']
        }
      ],
      specialSchemes: [
        {
          name: currentLanguage === 'hi' ? 'डिजिटल इंडिया पैकेज' : 'Digital India Package',
          description: currentLanguage === 'hi' ? 'डिजिटल सेवाओं का कॉम्बो पैकेज' : 'Combo package of digital services'
        },
        {
          name: currentLanguage === 'hi' ? 'यंग बैंकर' : 'Young Banker',
          description: currentLanguage === 'hi' ? 'युवाओं के लिए विशेष बैंकिंग' : 'Special banking for youth'
        }
      ]
    },
    {
      id: 'icici',
      name: 'ICICI Bank',
      hindi: 'आईसीआईसीआई बैंक',
      logo: '🏛️',
      type: 'Private',
      branches: '5,500+',
      founded: '1994',
      headquarters: 'Mumbai',
      customerCare: '1800 1080',
      website: 'icicibank.com',
      rating: 4.3,
      services: [
        {
          name: currentLanguage === 'hi' ? 'पावर सेविंग्स' : 'Power Savings',
          minBalance: '₹5,000',
          features: currentLanguage === 'hi' ? ['हाई इंटरेस्ट रेट', 'फ्री ATM', 'iMobile Pay'] : ['High interest rate', 'Free ATM', 'iMobile Pay']
        },
        {
          name: currentLanguage === 'hi' ? 'इंस्टा होम लोन' : 'Insta Home Loan',
          interestRate: '8.65% onwards',
          features: currentLanguage === 'hi' ? ['30 मिनट में अप्रूवल', 'जीरो प्रोसेसिंग फीस', 'ऑनलाइन अप्लाई'] : ['30 min approval', 'Zero processing fee', 'Online apply']
        },
        {
          name: currentLanguage === 'hi' ? 'बिजनेस लोन' : 'Business Loan',
          interestRate: '11.25% onwards',
          features: currentLanguage === 'hi' ? ['कोलेटरल फ्री', '₹50 लाख तक', 'फ्लेक्सिबल रीपेमेंट'] : ['Collateral free', 'Up to ₹50 lakh', 'Flexible repayment']
        },
        {
          name: currentLanguage === 'hi' ? 'गोल्ड लोन' : 'Gold Loan',
          interestRate: '9.50% onwards',
          features: currentLanguage === 'hi' ? ['इंस्टेंट अप्रूवल', 'सेफ गोल्ड स्टोरेज', 'पार्ट पेमेंट'] : ['Instant approval', 'Safe gold storage', 'Part payment']
        }
      ],
      specialSchemes: [
        {
          name: currentLanguage === 'hi' ? 'iWish फ्लेक्सिबल RD' : 'iWish Flexible RD',
          description: currentLanguage === 'hi' ? 'फ्लेक्सिबल रेकरिंग डिपॉजिट' : 'Flexible recurring deposit'
        },
        {
          name: currentLanguage === 'hi' ? 'रूरल बैंकिंग' : 'Rural Banking',
          description: currentLanguage === 'hi' ? 'ग्रामीण क्षेत्रों के लिए विशेष सेवाएं' : 'Special services for rural areas'
        }
      ]
    }
  ]

  const categories = [
    { value: 'all', label: currentLanguage === 'hi' ? 'सभी' : 'All', icon: FaUniversity },
    { value: 'basic', label: currentLanguage === 'hi' ? 'बेसिक' : 'Basic', icon: FaIdCard },
    { value: 'loans', label: currentLanguage === 'hi' ? 'लोन' : 'Loans', icon: FaCreditCard },
    { value: 'digital', label: currentLanguage === 'hi' ? 'डिजिटल' : 'Digital', icon: FaMobile },
    { value: 'investment', label: currentLanguage === 'hi' ? 'निवेश' : 'Investment', icon: FaChartLine },
    { value: 'insurance', label: currentLanguage === 'hi' ? 'बीमा' : 'Insurance', icon: FaShieldAlt }
  ]

  const bankingTips = [
    {
      icon: FaShieldAlt,
      title: currentLanguage === 'hi' ? 'सुरक्षित बैंकिंग' : 'Safe Banking',
      tip: currentLanguage === 'hi' ? 'कभी भी PIN/OTP किसी से शेयर न करें' : 'Never share PIN/OTP with anyone'
    },
    {
      icon: FaMobile,
      title: currentLanguage === 'hi' ? 'डिजिटल बैंकिंग' : 'Digital Banking',
      tip: currentLanguage === 'hi' ? 'UPI का उपयोग करके पैसा तुरंत भेजें' : 'Send money instantly using UPI'
    },
    {
      icon: FaCalculator,
      title: currentLanguage === 'hi' ? 'EMI प्लानिंग' : 'EMI Planning',
      tip: currentLanguage === 'hi' ? 'लोन लेने से पहले EMI कैलकुलेट करें' : 'Calculate EMI before taking loan'
    },
    {
      icon: FaHandHoldingUsd,
      title: currentLanguage === 'hi' ? 'बचत रणनीति' : 'Saving Strategy',
      tip: currentLanguage === 'hi' ? 'हर महीने कम से कम 20% बचत करें' : 'Save at least 20% every month'
    }
  ]

  const filteredTerms = selectedCategory === 'all' 
    ? bankingTerms 
    : bankingTerms.filter(term => term.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white rounded-2xl p-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <FaUniversity className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {currentLanguage === 'hi' ? '🏦 बैंकिंग गाइड' : '🏦 Banking Guide'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {currentLanguage === 'hi' 
              ? 'भारत के प्रमुख बैंकों की सेवाओं, बैंकिंग शब्दों और डिजिटल बैंकिंग की संपूर्ण जानकारी'
              : 'Complete information about major Indian banks, banking terms and digital banking services'}
          </p>
        </div>
      </motion.section>

      {/* Major Banks Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? '🏛️ भारत के प्रमुख बैंक' : '🏛️ Major Indian Banks'}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {majorBanks.map((bank, index) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Bank Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{bank.logo}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {currentLanguage === 'hi' ? bank.hindi : bank.name}
                      </h3>
                      <p className="text-sm text-gray-600">{bank.type} Bank</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">{bank.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bank Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="w-3 h-3 text-gray-500" />
                    <span>{bank.branches} branches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt className="w-3 h-3 text-gray-500" />
                    <span>{bank.customerCare}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaGlobe className="w-3 h-3 text-gray-500" />
                    <span>{bank.website}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUniversity className="w-3 h-3 text-gray-500" />
                    <span>Since {bank.founded}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  {currentLanguage === 'hi' ? 'मुख्य सेवाएं' : 'Main Services'}
                </h4>
                
                <div className="space-y-4">
                  {bank.services.map((service, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{service.name}</h5>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {service.minBalance || service.interestRate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIdx) => (
                          <span
                            key={featureIdx}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Schemes */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaAward className="w-5 h-5 mr-2 text-purple-600" />
                    {currentLanguage === 'hi' ? 'विशेष योजनाएं' : 'Special Schemes'}
                  </h4>
                  
                  <div className="space-y-3">
                    {bank.specialSchemes.map((scheme, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                        <h6 className="font-semibold text-purple-900 text-sm">{scheme.name}</h6>
                        <p className="text-purple-700 text-xs mt-1">{scheme.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedBank(bank)}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{currentLanguage === 'hi' ? 'विस्तृत जानकारी' : 'Detailed Info'}</span>
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Banking Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? '💡 उपयोगी बैंकिंग टिप्स' : '💡 Useful Banking Tips'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bankingTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? '📚 बैंकिंग शब्दावली' : '📚 Banking Terminology'}
        </h2>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            )
          })}
        </div>

        {/* Terms Grid */}
        <div className="grid gap-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term, index) => (
              <motion.div
                key={term._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="mr-3">{term.term}</span>
                      {term.hindi && (
                        <span className="text-emerald-600 text-lg">({term.hindi})</span>
                      )}
                      {term.importance === 'very-high' && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          बहुत महत्वपूर्ण
                        </span>
                      )}
                      {term.importance === 'high' && (
                        <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          महत्वपूर्ण
                        </span>
                      )}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                      {term.category}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800 leading-relaxed">
                        <span className="font-medium text-blue-600">
                          {currentLanguage === 'hi' ? 'परिभाषा:' : 'Definition:'} 
                        </span>
                        {' '}
                        {currentLanguage === 'hi' && term.hindiDefinition 
                          ? term.hindiDefinition 
                          : term.definition}
                      </p>
                      
                      {currentLanguage === 'hi' && term.hindiDefinition && term.definition && (
                        <p className="text-gray-600 text-sm mt-2 italic border-t border-gray-200 pt-2">
                          <span className="font-medium">English:</span> {term.definition}
                        </p>
                      )}
                    </div>

                    {/* Additional Info based on term type */}
                    {term.term === 'EMI' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-sm">
                          <span className="font-semibold">💡 Tip:</span> EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
                          <br />जहाँ P = Principal amount, r = Monthly interest rate, n = Number of months
                        </p>
                      </div>
                    )}

                    {term.term === 'UPI' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 text-sm">
                          <span className="font-semibold">🚀 Popular UPI Apps:</span> PhonePe, Google Pay, Paytm, BHIM, Amazon Pay
                        </p>
                      </div>
                    )}

                    {term.term === 'CIBIL Score' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="text-yellow-800 text-sm space-y-1">
                          <p><span className="font-semibold">📊 Score Range:</span></p>
                          <p>• 750-900: Excellent | • 700-749: Good | • 650-699: Fair | • Below 650: Poor</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLanguage === 'hi' ? 'कोई शब्द नहीं मिला' : 'No terms found'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'hi' 
                  ? 'इस श्रेणी में कोई बैंकिंग शब्द उपलब्ध नहीं है'
                  : 'No banking terms available in this category'}
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Educational Resources */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {currentLanguage === 'hi' ? '📖 अतिरिक्त संसाधन' : '📖 Additional Resources'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <FaLaptop className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentLanguage === 'hi' ? 'ऑनलाइन बैंकिंग गाइड' : 'Online Banking Guide'}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentLanguage === 'hi' 
                ? 'डिजिटल बैंकिंग की पूरी जानकारी'
                : 'Complete digital banking information'}
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <FaUserShield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentLanguage === 'hi' ? 'साइबर सिक्यूरिटी' : 'Cyber Security'}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentLanguage === 'hi' 
                ? 'ऑनलाइन लेनदेन की सुरक्षा'
                : 'Online transaction security'}
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <FaCheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentLanguage === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentLanguage === 'hi' 
                ? 'बैंकिंग से जुड़ी योजनाओं की जानकारी'
                : 'Banking related scheme information'}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Banking