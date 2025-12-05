import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import schemeRoutes from './routes/schemes.js';
import bankingRoutes from './routes/banking.js';
import chatRoutes from './routes/chat.js';
import calculatorRoutes from './routes/calculator.js';
import feedbackRoutes from './routes/feedback.js';

// Load env vars
dotenv.config();

// Debug environment variables
console.log('🔍 Environment debug:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? `Present (${process.env.GEMINI_API_KEY.substring(0, 10)}...)` : 'Missing');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `Present (${process.env.OPENAI_API_KEY.substring(0, 10)}...)` : 'Missing');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
// CORS configuration
const allowedOrigins = [
  "https://financial-literacy-app-seven-mocha.vercel.app",  // Your Vercel frontend
  "http://localhost:5173"                                   // Dev frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
app.use('/api', limiter);

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/schemes', schemeRoutes);
app.use('/api/v1/banking', bankingRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/calculator', calculatorRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
