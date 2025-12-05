import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Calculator = () => {
  const { current: currentLanguage } = useSelector((state) => state.language)
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [result, setResult] = useState(null)

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) return

    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 12 / 100
    const months = parseInt(tenure)

    let emi = 0
    if (rate === 0) {
      emi = principal / months
    } else {
      emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    }

    const totalAmount = emi * months
    const totalInterest = totalAmount - principal

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal)
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentLanguage === 'hi' ? 'लोन कैलकुलेटर' : 'Loan Calculator'}
        </h1>
        <p className="text-gray-600">
          {currentLanguage === 'hi' ? 'EMI की गणना करें' : 'Calculate EMI'}
        </p>
      </div>

      <div className="card p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'hi' ? 'लोन राशि' : 'Loan Amount'}
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'hi' ? 'ब्याज दर (%)' : 'Interest Rate (%)'}
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="12"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLanguage === 'hi' ? 'अवधि (महीने)' : 'Tenure (months)'}
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="24"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>

          <button
            onClick={calculateEMI}
            className="btn-primary w-full"
          >
            {currentLanguage === 'hi' ? 'गणना करें' : 'Calculate'}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                {currentLanguage === 'hi' ? 'परिणाम:' : 'Result:'}
              </h3>
              <p className="text-green-800">
                EMI: ₹{result.emi.toLocaleString('en-IN')}
              </p>
              <p className="text-green-800">
                {currentLanguage === 'hi' ? 'कुल राशि:' : 'Total Amount:'} ₹{result.totalAmount.toLocaleString('en-IN')}
              </p>
              <p className="text-green-800">
                {currentLanguage === 'hi' ? 'कुल ब्याज:' : 'Total Interest:'} ₹{result.totalInterest.toLocaleString('en-IN')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator