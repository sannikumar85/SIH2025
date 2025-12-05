import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Scheme from './models/Scheme.js';
import BankingTerm from './models/BankingTerm.js';
import User from './models/User.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Banking Terms Data
const bankingTerms = [
  {
    term: { en: "Savings Account", hi: "बचत खाता" },
    slug: "savings-account",
    category: "banking",
    explanation: {
      en: "A basic bank account where you can deposit money and earn a small amount of interest. Perfect for daily transactions and keeping money safe.",
      hi: "एक बुनियादी बैंक खाता जहाँ आप पैसा जमा कर सकते हैं और थोड़ा ब्याज कमा सकते हैं। दैनिक लेन-देन और पैसे को सुरक्षित रखने के लिए बिल्कुल सही।"
    },
    example: {
      en: "If you deposit ₹10,000 in a savings account with 4% annual interest, you'll earn ₹400 per year.",
      hi: "यदि आप 4% वार्षिक ब्याज वाले बचत खाते में ₹10,000 जमा करते हैं, तो आपको प्रति वर्ष ₹400 मिलेंगे।"
    },
    difficulty: "beginner",
    icon: "FaPiggyBank",
    order: 1
  },
  {
    term: { en: "Fixed Deposit", hi: "सावधि जमा" },
    slug: "fixed-deposit",
    category: "banking",
    explanation: {
      en: "A type of investment where you deposit money for a fixed period (months or years) at a higher interest rate than savings account.",
      hi: "एक प्रकार का निवेश जहाँ आप निश्चित अवधि (महीनों या वर्षों) के लिए बचत खाते से अधिक ब्याज दर पर पैसा जमा करते हैं।"
    },
    example: {
      en: "₹50,000 FD for 2 years at 6.5% will give you ₹56,700 at maturity.",
      hi: "6.5% पर 2 साल के लिए ₹50,000 FD मैच्योरिटी पर आपको ₹56,700 देगा।"
    },
    difficulty: "beginner",
    icon: "FaLock",
    order: 2
  },
  {
    term: { en: "KYC", hi: "केवाईसी" },
    slug: "kyc",
    category: "banking",
    explanation: {
      en: "Know Your Customer - verification process required by banks to confirm your identity using documents like Aadhaar, PAN card.",
      hi: "अपने ग्राहक को जानें - बैंकों द्वारा आधार, पैन कार्ड जैसे दस्तावेजों का उपयोग करके आपकी पहचान की पुष्टि करने की सत्यापन प्रक्रिया।"
    },
    difficulty: "beginner",
    icon: "FaIdCard",
    order: 3
  },
  {
    term: { en: "ATM", hi: "एटीएम" },
    slug: "atm",
    category: "banking",
    explanation: {
      en: "Automated Teller Machine - allows you to withdraw cash, check balance, and do other banking transactions 24/7.",
      hi: "स्वचालित टेलर मशीन - आपको 24/7 नकदी निकालने, बैलेंस चेक करने और अन्य बैंकिंग लेनदेन करने की सुविधा देती है।"
    },
    difficulty: "beginner",
    icon: "FaCreditCard",
    order: 4
  },
  {
    term: { en: "EMI", hi: "ईएमआई" },
    slug: "emi",
    category: "loans",
    explanation: {
      en: "Equated Monthly Installment - fixed payment amount made by borrower to lender at specified date each month.",
      hi: "समान मासिक किस्त - उधारकर्ता द्वारा प्रत्येक महीने निर्दिष्ट तारीख पर ऋणदाता को दी जाने वाली निश्चित भुगतान राशि।"
    },
    example: {
      en: "For a ₹1 lakh loan at 12% for 2 years, EMI would be approximately ₹4,707.",
      hi: "12% पर 2 साल के लिए ₹1 लाख के ऋण के लिए, ईएमआई लगभग ₹4,707 होगी।"
    },
    difficulty: "intermediate",
    icon: "FaCalculator",
    order: 5
  },
  {
    term: { en: "Credit Score", hi: "क्रेडिट स्कोर" },
    slug: "credit-score",
    category: "loans",
    explanation: {
      en: "A number between 300-900 that represents your creditworthiness based on payment history. Higher score means better loan terms.",
      hi: "300-900 के बीच एक संख्या जो भुगतान इतिहास के आधार पर आपकी साख का प्रतिनिधित्व करती है। उच्च स्कोर का मतलब बेहतर ऋण शर्तें।"
    },
    difficulty: "intermediate",
    icon: "FaChartLine",
    order: 6
  },
  {
    term: { en: "Interest Rate", hi: "ब्याज दर" },
    slug: "interest-rate",
    category: "general",
    explanation: {
      en: "The percentage charged on borrowed money or earned on deposited money. Lower is better for loans, higher for deposits.",
      hi: "उधार लिए गए पैसे पर लगाया जाने वाला या जमा किए गए पैसे पर मिलने वाला प्रतिशत। ऋण के लिए कम बेहतर है, जमा के लिए अधिक।"
    },
    difficulty: "beginner",
    icon: "FaPercent",
    order: 7
  },
  {
    term: { en: "Loan", hi: "ऋण" },
    slug: "loan",
    category: "loans",
    explanation: {
      en: "Money borrowed from bank or financial institution that must be repaid with interest over a specified period.",
      hi: "बैंक या वित्तीय संस्थान से उधार लिया गया पैसा जिसे निर्दिष्ट अवधि में ब्याज के साथ वापस करना होगा।"
    },
    difficulty: "beginner",
    icon: "FaMoneyBill",
    order: 8
  },
  {
    term: { en: "Nominee", hi: "नामांकित व्यक्ति" },
    slug: "nominee",
    category: "banking",
    explanation: {
      en: "Person designated to receive your money/benefits in case of your death. Essential for all bank accounts and investments.",
      hi: "आपकी मृत्यु की स्थिति में आपका पैसा/लाभ प्राप्त करने के लिए नामित व्यक्ति। सभी बैंक खातों और निवेशों के लिए आवश्यक।"
    },
    difficulty: "intermediate",
    icon: "FaUser",
    order: 9
  },
  {
    term: { en: "Compound Interest", hi: "चक्रवृद्धि ब्याज" },
    slug: "compound-interest",
    category: "investments",
    explanation: {
      en: "Interest calculated on initial principal plus accumulated interest. More powerful than simple interest for long-term growth.",
      hi: "प्रारंभिक मूलधन और संचित ब्याज पर गणना किया गया ब्याज। दीर्घकालिक विकास के लिए सरल ब्याज से अधिक शक्तिशाली।"
    },
    difficulty: "advanced",
    icon: "FaChartArea",
    order: 10
  },
  {
    term: { en: "UPI", hi: "यूपीआई" },
    slug: "upi",
    category: "banking",
    explanation: {
      en: "Unified Payments Interface - instant payment system that allows money transfer between bank accounts through mobile.",
      hi: "एकीकृत भुगतान इंटरफेस - तत्काल भुगतान प्रणाली जो मोबाइल के माध्यम से बैंक खातों के बीच धन स्थानांतरण की अनुमति देती है।"
    },
    difficulty: "beginner",
    icon: "FaMobile",
    order: 11
  },
  {
    term: { en: "Inflation", hi: "मुद्रास्फीति" },
    slug: "inflation",
    category: "general",
    explanation: {
      en: "General increase in prices over time, reducing purchasing power. Important to consider when saving and investing.",
      hi: "समय के साथ कीमतों में सामान्य वृद्धि, क्रय शक्ति को कम करना। बचत और निवेश करते समय विचार करना महत्वपूर्ण है।"
    },
    difficulty: "advanced",
    icon: "FaTrendingUp",
    order: 12
  }
];

// Government Schemes Data
const schemes = [
  {
    name: { en: "Pradhan Mantri Kisan Samman Nidhi", hi: "प्रधानमंत्री किसान सम्मान निधि" },
    shortName: "PM-KISAN",
    category: "agriculture",
    description: {
      en: "Financial support of ₹6,000 per year to farmer families through Direct Benefit Transfer",
      hi: "प्रत्यक्ष लाभ अंतरण के माध्यम से किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता"
    },
    benefits: {
      en: [
        "₹6,000 per year in 3 equal installments",
        "Direct transfer to bank account",
        "No application required for existing beneficiaries"
      ],
      hi: [
        "प्रति वर्ष ₹6,000 तीन बराबर किस्तों में",
        "बैंक खाते में सीधा हस्तांतरण",
        "मौजूदा लाभार्थियों के लिए कोई आवेदन आवश्यक नहीं"
      ]
    },
    eligibility: {
      occupation: ["farmer"],
      incomeRange: ["below_2l", "2l_5l"],
      ageGroup: ["18-25", "26-40", "41-60", "60+"],
      criteria: {
        en: ["Small and marginal farmers", "Land ownership required", "Valid Aadhaar card"],
        hi: ["छोटे और सीमांत किसान", "भूमि स्वामित्व आवश्यक", "वैध आधार कार्ड"]
      }
    },
    requiredDocuments: {
      en: ["Aadhaar card", "Bank account details", "Land ownership papers", "Passport size photo"],
      hi: ["आधार कार्ड", "बैंक खाता विवरण", "भूमि स्वामित्व के कागजात", "पासपोर्ट साइज फोटो"]
    },
    applicationProcess: {
      en: [
        "Visit PM-KISAN portal or CSC center",
        "Fill application form with required details",
        "Upload documents",
        "Submit and note registration number"
      ],
      hi: [
        "PM-KISAN पोर्टल या CSC केंद्र पर जाएं",
        "आवश्यक विवरण के साथ आवेदन फॉर्म भरें",
        "दस्तावेज अपलोड करें",
        "सबमिट करें और पंजीकरण संख्या नोट करें"
      ]
    },
    officialWebsite: "https://pmkisan.gov.in",
    maxBenefit: "₹6,000 per year",
    popularity: 95
  },
  {
    name: { en: "Pradhan Mantri Mudra Yojana", hi: "प्रधानमंत्री मुद्रा योजना" },
    shortName: "MUDRA",
    category: "business",
    description: {
      en: "Loans up to ₹10 lakh for micro-enterprises without collateral requirement",
      hi: "सूक्ष्म उद्यमों के लिए बिना गारंटी आवश्यकता के ₹10 लाख तक के ऋण"
    },
    benefits: {
      en: [
        "Shishu: Up to ₹50,000",
        "Kishore: ₹50,000 to ₹5 lakh",
        "Tarun: ₹5 lakh to ₹10 lakh",
        "No collateral required"
      ],
      hi: [
        "शिशु: ₹50,000 तक",
        "किशोर: ₹50,000 से ₹5 लाख",
        "तरुण: ₹5 लाख से ₹10 लाख",
        "कोई गारंटी आवश्यक नहीं"
      ]
    },
    eligibility: {
      occupation: ["business", "farmer", "other"],
      incomeRange: ["below_2l", "2l_5l", "5l_10l"],
      ageGroup: ["18-25", "26-40", "41-60"],
      criteria: {
        en: ["Age 18-65 years", "Income generating activity", "No default in any bank"],
        hi: ["आयु 18-65 वर्ष", "आय सृजन गतिविधि", "किसी भी बैंक में कोई चूक नहीं"]
      }
    },
    requiredDocuments: {
      en: ["Identity proof", "Address proof", "Business plan", "Income proof", "Bank statements"],
      hi: ["पहचान प्रमाण", "पता प्रमाण", "व्यापार योजना", "आय प्रमाण", "बैंक विवरण"]
    },
    applicationProcess: {
      en: [
        "Prepare business plan",
        "Visit nearest bank/NBFC",
        "Fill MUDRA loan application",
        "Submit documents and get approval"
      ],
      hi: [
        "व्यापार योजना तैयार करें",
        "निकटतम बैंक/NBFC पर जाएं",
        "MUDRA ऋण आवेदन भरें",
        "दस्तावेज जमा करें और अनुमोदन प्राप्त करें"
      ]
    },
    officialWebsite: "https://mudra.org.in",
    maxBenefit: "₹10 lakh loan",
    popularity: 88
  },
  {
    name: { en: "Pradhan Mantri Jan Dhan Yojana", hi: "प्रधानमंत्री जन धन योजना" },
    shortName: "PMJDY",
    category: "business",
    description: {
      en: "Financial inclusion program ensuring access to banking facilities with zero balance account",
      hi: "जीरो बैलेंस खाते के साथ बैंकिंग सुविधाओं तक पहुंच सुनिश्चित करने वाला वित्तीय समावेशन कार्यक्रम"
    },
    benefits: {
      en: [
        "Zero balance savings account",
        "RuPay debit card",
        "₹2 lakh accident insurance",
        "₹30,000 life insurance",
        "Overdraft facility"
      ],
      hi: [
        "जीरो बैलेंस बचत खाता",
        "RuPay डेबिट कार्ड",
        "₹2 लाख दुर्घटना बीमा",
        "₹30,000 जीवन बीमा",
        "ओवरड्राफ्ट सुविधा"
      ]
    },
    eligibility: {
      occupation: ["all"],
      incomeRange: ["below_2l", "2l_5l", "5l_10l", "above_10l"],
      ageGroup: ["18-25", "26-40", "41-60", "60+"],
      criteria: {
        en: ["Indian citizen", "Age 10+ years", "Valid identity proof"],
        hi: ["भारतीय नागरिक", "आयु 10+ वर्ष", "वैध पहचान प्रमाण"]
      }
    },
    requiredDocuments: {
      en: ["Aadhaar card", "Address proof", "Passport size photo"],
      hi: ["आधार कार्ड", "पता प्रमाण", "पासपोर्ट साइज फोटो"]
    },
    applicationProcess: {
      en: [
        "Visit any bank branch",
        "Fill account opening form",
        "Provide KYC documents",
        "Receive account number and debit card"
      ],
      hi: [
        "कोई भी बैंक शाखा पर जाएं",
        "खाता खोलने का फॉर्म भरें",
        "KYC दस्तावेज प्रदान करें",
        "खाता संख्या और डेबिट कार्ड प्राप्त करें"
      ]
    },
    officialWebsite: "https://pmjdy.gov.in",
    maxBenefit: "Banking services + Insurance",
    popularity: 92
  }
  // Add more schemes here...
];

const importData = async () => {
  try {
    await Scheme.deleteMany();
    await BankingTerm.deleteMany();

    await Scheme.insertMany(schemes);
    await BankingTerm.insertMany(bankingTerms);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const destroyData = async () => {
  try {
    await Scheme.deleteMany();
    await BankingTerm.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}