# Financial Literacy App - SIH 2025

A comprehensive financial literacy application built for rural India, featuring government schemes, banking information, AI-powered chat assistance, and financial calculators.

## 🚀 Features

- **Government Schemes**: Coming soon - 15+ government schemes with eligibility checker
- **Banking Information**: Comprehensive banking terms and major bank details
- **AI Chat Assistant**: Gemini AI-powered financial guidance in Hindi and English
- **Financial Calculators**: EMI, compound interest, and investment calculators
- **Multilingual Support**: Hindi and English language support
- **Responsive Design**: Mobile-first design with modern UI/UX
- **Voice Features**: Voice input and output for accessibility

## 🛠 Tech Stack

### Frontend
- React 18+ with Vite
- Tailwind CSS for styling
- Redux Toolkit for state management
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication
- Gemini AI integration
- Rate limiting and security middleware

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api/v1
```

## 🚀 Usage

1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173 in your browser

## 📱 Pages

- **Home**: Government-style landing page with key features
- **Banking**: Banking terms, major banks information, and tips
- **Schemes**: Coming soon page with waitlist signup
- **Chat**: AI-powered financial assistant
- **Calculator**: Financial calculation tools
- **Profile**: User authentication and profile management

## 🎯 Government Schemes Feature (Coming Soon)

The schemes page features a modern "Coming Soon" design with:
- Glassmorphism UI effects
- Animated background and particles
- Waitlist signup form
- Scheme previews
- FAQ section
- Bilingual support

## 🤝 Contributing

This project was developed for Smart India Hackathon (SIH) 2025. Contributions are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed for SIH 2025 - Financial Literacy for Rural India

---

Made with ❤️ for rural India's financial empowerment