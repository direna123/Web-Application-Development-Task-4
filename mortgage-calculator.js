// 1. Prompt the user to write their deposit amount
// 2. Prompt the user to write the annual interest 
// 3. Prompt the user to write their term in years
// 4. Monthly payment
// 5. Repayment

const prompt = require('prompt-sync')();                                    // Function for taking user input
const MONTHS_IN_A_YEAR = 12;                                                // A varible that has the value 12, so that in the future it is not confusing as to why we multiply with 12

function formatAmountWithCommas(amount) {                                   // Formatting the number so that is it better readable
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateMonthlyPayment(principal, annualInterestRate, loanTerm) {       // Function to calucalte the mortgage
  try {
    principal = parseFloat(principal.replace(',', ''));                     // parseFloat - converts strings into numbers
    annualInterestRate = parseFloat(annualInterestRate.replace(',', ''));
    loanTerm = parseInt(loanTerm.replace(',', ''));

    if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(loanTerm) || principal <= 0 || annualInterestRate <= 0 || loanTerm <= 0) {       // isNaN - means is it a number
      throw new Error('Please enter valid positive numbers for all fields.');
    }

    const monthlyInterestRate = annualInterestRate / 100 / MONTHS_IN_A_YEAR;
    const numberOfPayments = loanTerm * MONTHS_IN_A_YEAR;

    const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /           // Math.pow - function that raises numbers into exponents
                          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);                                           // The formula

    const totalRepayment = monthlyPayment * numberOfPayments;
    const roundedMonthlyPayment = formatAmountWithCommas(monthlyPayment.toFixed(2));                                        // toFixed - Rounds the string to a specified number of decimals
    const roundedTotalRepayment = formatAmountWithCommas(totalRepayment.toFixed(2));

    return {
      monthlyPayment: `Your monthly payment is ${roundedMonthlyPayment} EUR`,
      totalRepayment: `YOur total repayment is ${roundedTotalRepayment} EUR`
    };
  } catch (error) {
    return 'Error:  + error.message';
  }
}

// Get user input for principal, annual interest rate, and loan term in euros
const principalInput = prompt('Enter the loan amount in euros: ');
const annualInterestRateInput = prompt('Enter the interest rate (%): ');
const loanTermInput = prompt('Enter the loan term (years): ');

const result = calculateMonthlyPayment(principalInput, annualInterestRateInput, loanTermInput);
console.log(result.monthlyPayment);
console.log(result.totalRepayment);