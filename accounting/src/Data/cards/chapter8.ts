import { Card } from "../../Types";

export const cards: Card[] = [
  // ==========================================
  // SECTION 1: RECOGNIZING ACCOUNTS RECEIVABLE
  // ==========================================
  {
    q: "Amounts that customers owe a company on account, resulting from the sale of goods or services, are called:",
    a: "A",
    o: [
      "Accounts receivable",
      "Notes receivable",
      "Other receivables",
      "Trade notes"
    ],
    category: "general",
    explanation: "The correct answer is A. Accounts receivable are amounts customers owe on account from regular sales transactions."
  },
  {
    q: "Amounts due from individuals and companies that are expected to be collected in cash are broadly classified as:",
    a: "C",
    o: [
      "Prepaid expenses",
      "Investments",
      "Receivables",
      "Intangible assets"
    ],
    category: "general",
    explanation: "The correct answer is C. Receivables encompass all gross monetary claims against individuals, companies, or other entities expected to settle in cash."
  },
  {
    q: "Notes and accounts receivable that result directly from regular sales transactions are explicitly called:",
    a: "B",
    o: [
      "Nontrade receivables",
      "Trade receivables",
      "Other receivables",
      "Unearned revenues"
    ],
    category: "general",
    explanation: "The correct answer is B. Trade receivables specifically refer to the claims arising out of credit sales transactions with customers."
  },
  {
    q: "A receivable that is evidenced by a formal written instrument and that normally requires the payment of interest is called:",
    a: "A",
    o: [
      "a note receivable.",
      "an account receivable.",
      "an other receivable.",
      "an interest receivable."
    ],
    category: "general",
    explanation: "The correct answer is A. A note receivable is a formal, legally binding credit agreement that carries explicit terms, including interest calculation."
  },
  {
    q: "Receivables are frequently classified on the balance sheet as:",
    a: "D",
    o: [
      "current receivables, non-current receivables, and liquid receivables.",
      "trade receivables, sales receivables, and operational receivables.",
      "collected receivables, uncollectible accounts, and written-off notes.",
      "accounts receivable, notes receivable, and other receivables."
    ],
    category: "general",
    explanation: "The correct answer is D. Financial reporting conventionally splits total receivables into accounts receivable, notes receivable, and other miscellaneous items."
  },
  {
    q: "Accounts and notes receivable are reported in the current assets section of the balance sheet at their:",
    a: "C",
    o: [
      "historical face value.",
      "liquidation value.",
      "cash (net) realizable value.",
      "gross market value."
    ],
    category: "general",
    explanation: "The correct answer is C. Cash (net) realizable value represents the net amount of cash a company actually expects to collect from its outstanding receivables."
  },
  {
    q: "Which of these statements about Visa credit card sales is incorrect?",
    a: "B",
    o: [
      "The credit card issuer conducts the credit investigation of the customer.",
      "The retailer must wait to receive payment from the issuer.",
      "The retailer pays the credit card issuer a service fee.",
      "The transaction is considered a cash sale by the retailer."
    ],
    category: "general",
    explanation: "The correct answer is B. Visa card sales function like cash sales for retailers; the bank deposits cash quickly into the retailer's account, so they do not wait for the customer to clear balances."
  },
  {
    q: "A company can accelerate its cash receipts from outstanding credit claims by all of the following actions except:",
    a: "D",
    o: [
      "selling receivables to a factor.",
      "offering early payment discounts.",
      "accepting major bank credit cards.",
      "writing off receivables."
    ],
    category: "general",
    explanation: "The correct answer is D. Writing off an account recognizes it as uncollectible; it eliminates the asset from the books without bringing in cash receipts."
  },
  {
    q: "Consider the following statements about promissory notes:\nS1: The party making the promise to pay is called the maker.\nS2: The party to whom payment is to be made is called the payee.\nS3: A promissory note is not a negotiable instrument.\nS4: A promissory note is more liquid than an account receivable.\n\nWhich statement is incorrect?",
    a: "C",
    o: [
      "S1",
      "S2",
      "S3",
      "S4"
    ],
    category: "general",
    explanation: "The correct answer is C. Statement S3 is incorrect because promissory notes are highly legally formal negotiable instruments that can easily be transferred or sold to other parties."
  },
  {
    q: "Which of the following actions is NOT appropriate for a company looking to reduce its credit risk?",
    a: "D",
    o: [
      "Require the customer to pay cash in advance.",
      "Require the customer to provide a letter of credit or bank guarantee.",
      "Contact references provided by the customer (banks, suppliers).",
      "Provide the customer a lengthy payment period."
    ],
    category: "general",
    explanation: "The correct answer is D. Lengthening payment windows actually elevates exposure risk by keeping balances uncollected for longer periods, potentially compounding credit risk issues."
  },

  // ==========================================
  // SECTION 2: VALUATION & DISPOSITION OF AR
  // ==========================================
  {
    q: "A financial schedule that classifies accounts receivable balances by the length of time they have remained unpaid is called:",
    a: "B",
    o: [
      "The direct write-off matrix",
      "Aging the accounts receivable",
      "The factoring breakdown schedule",
      "The percentage-of-sales model"
    ],
    category: "general",
    explanation: "The correct answer is B. Aging reports group individual customer ledger account balances into aging buckets to establish uncollectible trends."
  },
  {
    q: "The process of estimating uncollectible accounts at the end of each period to achieve proper matching on financial statements is called the:",
    a: "C",
    o: [
      "Direct write-off method",
      "Cash realization process",
      "Allowance method",
      "Factoring method"
    ],
    category: "general",
    explanation: "The correct answer is C. The allowance method estimates non-collectible claims dynamically ahead of time to offset current period income values properly."
  },
  {
    q: "The expense account used to record losses resulting from extending credit to customers who fail to pay is:",
    a: "A",
    o: [
      "Bad Debt Expense",
      "Service Charge Expense",
      "Allowance for Doubtful Accounts",
      "Interest Expense"
    ],
    category: "general",
    explanation: "The correct answer is A. Bad Debt Expense tracks financial credit extension losses directly on the Multi-Step Income statement."
  },
  {
    q: "The alternative method where a company writes off a receivable only when it is definitively deemed uncollectible is the:",
    a: "D",
    o: [
      "Aging method",
      "Percentage-of-receivables method",
      "Allowance method",
      "Direct write-off method"
    ],
    category: "general",
    explanation: "The correct answer is D. The direct write-off method directly records an expense when a specific user defaults, rather than estimating values ahead of time via an allowance account."
  },
  {
    q: "A finance company or bank that buys accounts receivable from businesses for a fee and collects payments directly from customers is called a:",
    a: "B",
    o: [
      "Maker",
      "Factor",
      "Payee",
      "Creditor"
    ],
    category: "general",
    explanation: "The correct answer is B. A factor purchases trade receivables from cash-strapped operational businesses to optimize cash flows."
  },
  {
    q: "Estimating bad debts based on historical loss percentages applied against ending accounts receivable balances is using the:",
    a: "A",
    o: [
      "Percentage-of-receivables basis",
      "Direct allocation basis",
      "Percentage-of-sales basis",
      "Amortized historical rate method"
    ],
    category: "general",
    explanation: "The correct answer is A. The percentage-of-receivables method matches historical default ratios directly to outstanding balance sheets."
  },
  {
    q: "Net credit sales for the month are $800,000. The accounts receivable balance is $160,000. The allowance is calculated as 7.5% of the receivables balance using the percentage-of-receivables basis. If Allowance for Doubtful Accounts has a credit balance of $5,000 before adjustment, what is the balance after adjustment?",
    a: "A",
    o: [
      "$12,000.",
      "$7,000.",
      "$17,000.",
      "$5,000."
    ],
    category: "general",
    explanation: "The correct answer is A. Under the percentage-of-receivables basis, the target ending balance of the allowance account is computed directly: $160,000 * 7.5% = $12,000. The account balance after adjustment must equal this target."
  },
  {
    q: "Patterson Wholesale Company determines its required target ending Allowance for Doubtful Accounts balance to be $37,000. If the allowance account currently has a $5,000 credit balance before adjustment, what is the required adjusting entry to Bad Debt Expense?",
    a: "B",
    o: [
      "$37,000.",
      "$32,000.",
      "$42,000.",
      "$5,000."
    ],
    category: "general",
    explanation: "The correct answer is B. To move the existing credit balance from $5,000 up to the target ending credit balance of $37,000, you need an adjustment of $37,000 - $5,000 = $32,000."
  },
  {
    q: "If a company has an Accounts Receivable balance of $772,000 and the Allowance for Doubtful Accounts balance after adjustment is $37,000, what is the cash realizable value of the accounts receivable?",
    a: "C",
    o: [
      "$772,000.",
      "$809,000.",
      "$735,000.",
      "$700,000."
    ],
    category: "general",
    explanation: "The correct answer is C. Cash realizable value = Gross Accounts Receivable ($772,000) minus Allowance for Doubtful Accounts ($37,000) = $735,000."
  },
  {
    q: "Good Stuff Retailers accepted $50,000 of Citibank Visa credit card charges from customers. If Visa charges a 4% service fee, the journal entry includes a credit to Sales Revenue for $50,000 and a corresponding debit(s) to:",
    a: "D",
    o: [
      "Accounts Receivable $50,000.",
      "Cash $50,000.",
      "Cash $46,000 and Service Charge Expense $4,000.",
      "Cash $48,000 and Service Charge Expense $2,000."
    ],
    category: "general",
    explanation: "The correct answer is D. The service charge is $50,000 * 4% = $2,000. The net cash received is $50,000 - $2,000 = $48,000. Thus, Cash is debited for $48,000 and Service Charge Expense is debited for $2,000."
  },
  {
    q: "Given an Allowance for Doubtful Accounts credit balance before adjustment of $5,000, and a desired target ending balance of $60,000 (credit), what is the calculated Bad Debt Expense adjustment amount?",
    a: "C",
    o: [
      "60,000",
      "65,000",
      "55,000",
      "5,000"
    ],
    category: "general",
    explanation: "The correct answer is C. Since there is already a $5,000 credit on the books, you calculate the required adjustment as: Desired Ending ($60,000) - Current Credit ($5,000) = $55,000."
  },
  {
    q: "Given an Allowance for Doubtful Accounts debit balance before adjustment of $5,000, and a desired target ending balance of $60,000 (credit), what is the calculated Bad Debt Expense adjustment amount?",
    a: "A",
    o: [
      "65,000",
      "55,000",
      "60,000",
      "5,000"
    ],
    category: "general",
    explanation: "The correct answer is A. A debit balance means the account is currently in a deficit. To establish a $60,000 credit balance, you must clear the $5,000 debit deficit and add the $60,000 target: $5,000 + $60,000 = $65,000."
  },

  // ==========================================
  // SECTION 3: NOTES RECEIVABLE
  // ==========================================
  {
    q: "A written promise to pay a specified amount of money on demand or at a definite time is called a:",
    a: "B",
    o: [
      "Trade account receivable",
      "Promissory note",
      "Credit line agreement",
      "Factored claim note"
    ],
    category: "general",
    explanation: "The correct answer is B. Promissory notes represent formal instruments of credit detailing definite repayment timelines."
  },
  {
    q: "In a promissory note transaction, the party making the promise to pay is the ________, and the party receiving the payment is the ________.",
    a: "A",
    o: [
      "maker; payee",
      "payee; maker",
      "creditor; factor",
      "factor; customer"
    ],
    category: "general",
    explanation: "The correct answer is A. The maker signs the note promising payment, while the payee is the designated recipient of those funds."
  },
  {
    q: "A note that is not paid in full at its designated maturity date is classified as a:",
    a: "C",
    o: [
      "Liquidated note",
      "Factored note",
      "Dishonored (defaulted) note",
      "Amortized note"
    ],
    category: "general",
    explanation: "The correct answer is C. A note is dishonored when its maker fails to clear payment full terms on the final maturity date."
  },
  {
    q: "When a company accepts a $1,000 promissory note from a customer to settle an open account receivable balance, what is the valid journal entry transformation?",
    a: "B",
    o: [
      "Debit Accounts Receivable 1,000, Credit Notes Receivable 1,000",
      "Debit Notes Receivable 1,000, Credit Accounts Receivable 1,000",
      "Debit Cash 1,000, Credit Notes Receivable 1,000",
      "Debit Notes Receivable 1,000, Credit Interest Revenue 1,000"
    ],
    category: "general",
    explanation: "The correct answer is B. The firm swaps out an open account receivable for a formal note receivable by debiting Notes Receivable and crediting Accounts Receivable."
  },
  {
    q: "A company collects a 120-day, 9% promissory note with a principal amount of $10,000 at maturity. (Use a 360-day year). What is the correct journal entry to record this final collection?",
    a: "C",
    o: [
      "Debit Cash 10,000; Credit Notes Receivable 10,000",
      "Debit Cash 10,900; Credit Notes Receivable 10,000, Interest Revenue 900",
      "Debit Cash 10,300; Credit Notes Receivable 10,000, Interest Revenue 300",
      "Debit Cash 10,300; Credit Accounts Receivable 10,000, Interest Revenue 300"
    ],
    category: "general",
    explanation: "The correct answer is C. Interest = Principal * Rate * Time = $10,000 * 9% * (120/360) = $300. Total collection amount is $10,300, which includes the settlement of the $10,000 asset and $300 of Interest Revenue."
  },

  // ==========================================
  // SECTION 4: MANAGEMENT OF RECEIVABLES
  // ==========================================
  {
    q: "Which financial metric measures the liquidity of receivables by comparing net credit sales to average net receivables during a period?",
    a: "D",
    o: [
      "Profit margin",
      "Average collection period",
      "Asset turnover ratio",
      "Accounts receivable turnover"
    ],
    category: "general",
    explanation: "The correct answer is D. The accounts receivable turnover ratio measures how many times, on average, a company collects its receivables during the period."
  },
  {
    q: "The average time that receivables remain outstanding before collection is called the:",
    a: "A",
    o: [
      "Average collection period",
      "Accounts receivable turnover ratio",
      "Operating lifecycle frame",
      "Days inventory outstanding"
    ],
    category: "general",
    explanation: "The correct answer is A. The average collection period converts turnover frequencies directly into operational days outstanding metrics."
  },
  {
    q: "A threat that arises when a company is heavily reliant on a single major customer or industry group for its credit sales is called:",
    a: "C",
    o: [
      "Operational asset dilution",
      "Factoring variance risk",
      "Concentration of credit risk",
      "Default collection variance"
    ],
    category: "general",
    explanation: "The correct answer is C. Credit concentration risks highlight over-dependence exposures bound to specific key customer accounts."
  },
  {
    q: "Kersee Company sells merchandise on account to Eng Co. on June 15 for $1,000, terms 2/10, n/30. On June 20, Eng Co. returns merchandise worth $300. On June 24, payment is received from Eng Co. for the balance due. What is the amount of cash received?",
    a: "B",
    o: [
      "$1,000.",
      "$686.",
      "$700.",
      "$672."
    ],
    category: "general",
    explanation: "The correct answer is B. The outstanding balance drops to $700 after the return ($1,000 - $300). Since the payment is received on June 24 (within the 10-day discount window from June 15), a 2% discount applies ($700 * 2% = $14). Cash received = $700 - $14 = $686."
  },
  {
    q: "A company reports Net Credit Sales of $800,000. Its beginning Accounts Receivable balance was $100,000 and ending balance was $150,000. Calculate its accounts receivable turnover and average collection period (rounded to nearest day).",
    a: "A",
    o: [
      "6.4 times and 57 days",
      "5.3 times and 69 days",
      "8.0 times and 46 days",
      "6.4 times and 52 days"
    ],
    category: "general",
    explanation: "The correct answer is A. Average AR = ($100,000 + $150,000) / 2 = $125,000. Accounts Receivable Turnover = $800,000 / $125,000 = 6.4. Average Collection Period = 365 / 6.4 ≈ 57 days."
  },
  {
    q: "If a company has an accounts receivable turnover ratio of 7, what is its average collection period?",
    a: "D",
    o: [
      "30 days",
      "45 days",
      "60 days",
      "52 days"
    ],
    category: "general",
    explanation: "The correct answer is D. Average collection period = 365 days / Accounts Receivable Turnover = 365 / 7 ≈ 52 days."
  }
];
