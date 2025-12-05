import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// @route   POST /api/v1/calculator/emi
// @desc    Calculate EMI
// @access  Public
router.post('/emi', [
  body('principal').isNumeric().withMessage('Principal amount is required'),
  body('rate').isNumeric().withMessage('Interest rate is required'),
  body('tenure').isNumeric().withMessage('Loan tenure is required')
], validate, (req, res) => {
  try {
    const { principal, rate, tenure, tenureType = 'months' } = req.body;

    // Convert tenure to months if in years
    const tenureInMonths = tenureType === 'years' ? tenure * 12 : tenure;
    
    // Monthly interest rate
    const monthlyRate = rate / 12 / 100;

    // EMI calculation using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let emi;
    if (monthlyRate === 0) {
      emi = principal / tenureInMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, tenureInMonths);
      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalAmount = emi * tenureInMonths;
    const totalInterest = totalAmount - principal;

    // Generate amortization schedule
    const schedule = [];
    let balance = principal;
    
    for (let month = 1; month <= tenureInMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.max(0, Math.round(balance))
      });
    }

    res.json({
      success: true,
      data: {
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: Math.round(principal),
        interestRate: rate,
        tenure: tenureInMonths,
        schedule
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Calculation error'
    });
  }
});

// @route   POST /api/v1/calculator/compare
// @desc    Compare formal vs informal loan
// @access  Public
router.post('/compare', [
  body('principal').isNumeric().withMessage('Principal amount is required'),
  body('tenure').isNumeric().withMessage('Loan tenure is required')
], validate, (req, res) => {
  try {
    const { principal, tenure, tenureType = 'months', formalRate = 12, informalRate = 36 } = req.body;

    const tenureInMonths = tenureType === 'years' ? tenure * 12 : tenure;

    // Calculate for formal loan (bank)
    const formalMonthlyRate = formalRate / 12 / 100;
    let formalEmi;
    if (formalMonthlyRate === 0) {
      formalEmi = principal / tenureInMonths;
    } else {
      const formalFactor = Math.pow(1 + formalMonthlyRate, tenureInMonths);
      formalEmi = (principal * formalMonthlyRate * formalFactor) / (formalFactor - 1);
    }
    const formalTotal = formalEmi * tenureInMonths;
    const formalInterest = formalTotal - principal;

    // Calculate for informal loan (moneylender)
    const informalMonthlyRate = informalRate / 12 / 100;
    let informalEmi;
    if (informalMonthlyRate === 0) {
      informalEmi = principal / tenureInMonths;
    } else {
      const informalFactor = Math.pow(1 + informalMonthlyRate, tenureInMonths);
      informalEmi = (principal * informalMonthlyRate * informalFactor) / (informalFactor - 1);
    }
    const informalTotal = informalEmi * tenureInMonths;
    const informalInterest = informalTotal - principal;

    // Calculate savings
    const savings = informalTotal - formalTotal;
    const savingsPercentage = ((savings / informalTotal) * 100).toFixed(1);

    res.json({
      success: true,
      data: {
        formal: {
          type: 'Bank Loan',
          emi: Math.round(formalEmi),
          totalAmount: Math.round(formalTotal),
          totalInterest: Math.round(formalInterest),
          interestRate: formalRate
        },
        informal: {
          type: 'Moneylender',
          emi: Math.round(informalEmi),
          totalAmount: Math.round(informalTotal),
          totalInterest: Math.round(informalInterest),
          interestRate: informalRate
        },
        savings: {
          amount: Math.round(savings),
          percentage: savingsPercentage,
          message: savings > 0 
            ? `You save ₹${Math.round(savings).toLocaleString('en-IN')} (${savingsPercentage}%) by choosing a bank loan!`
            : 'Bank loans are more economical than informal lending.'
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Calculation error'
    });
  }
});

// @route   POST /api/v1/calculator/eligibility
// @desc    Check loan eligibility
// @access  Public
router.post('/eligibility', [
  body('monthlyIncome').isNumeric().withMessage('Monthly income is required'),
  body('existingEmi').isNumeric().withMessage('Existing EMI is required')
], validate, (req, res) => {
  try {
    const { monthlyIncome, existingEmi = 0, loanType = 'personal' } = req.body;

    // Maximum EMI should be 40-50% of income
    const maxEmiPercentage = loanType === 'home' ? 0.5 : 0.4;
    const availableForEmi = (monthlyIncome * maxEmiPercentage) - existingEmi;

    // Estimate loan amount based on different tenures and rates
    const estimates = [];
    const rates = {
      personal: 12,
      business: 14,
      education: 8,
      agriculture: 7,
      home: 8.5
    };

    const rate = rates[loanType] || 12;
    const tenures = [12, 24, 36, 60, 84];

    tenures.forEach(tenure => {
      const monthlyRate = rate / 12 / 100;
      const factor = Math.pow(1 + monthlyRate, tenure);
      const principal = availableForEmi * (factor - 1) / (monthlyRate * factor);

      if (principal > 0) {
        estimates.push({
          tenure,
          maxLoan: Math.round(principal),
          emi: Math.round(availableForEmi),
          interestRate: rate
        });
      }
    });

    res.json({
      success: true,
      data: {
        monthlyIncome,
        existingEmi,
        availableForEmi: Math.round(availableForEmi),
        loanType,
        estimates,
        tips: availableForEmi <= 0 
          ? ['Your existing EMIs are too high. Consider paying off some loans first.']
          : [
              'Maintain a good credit score (750+) for better rates',
              'Keep EMI below 40% of your income',
              'Compare rates from multiple banks'
            ]
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Calculation error'
    });
  }
});

export default router;
