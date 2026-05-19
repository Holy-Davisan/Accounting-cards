import { Card } from "../../types";

export const cards: Card[] = [
{
  q: "Unorganized set: {contract identification, performance obligations, transaction price, allocation, revenue recognition}. Which sequence correctly represents the 5-step revenue recognition model under the revenue principle?",
  a: "C",
  o: [
    "Transaction price → contract → allocation → performance obligations → revenue recognition",
    "Revenue recognition → allocation → transaction price → contract → performance obligations",
    "Contract → performance obligations → transaction price → allocation → revenue recognition",
    "Performance obligations → contract → allocation → transaction price → revenue recognition"
  ],
  category: "concept",
  explanation: "The correct answer is C because revenue recognition follows a strict logical sequence: (1) identify the contract, (2) identify performance obligations, (3) determine transaction price, (4) allocate price to obligations, (5) recognize revenue when obligations are satisfied. Mnemonic: 'C-P-T-A-R' = Contracts, Performance, Transaction price, Allocation, Recognition."
},

{
  q: "Mnemonic interpretation: CPTAR represents which accounting process?",
  a: "A",
  o: [
    "Cost, Profit, Tax, Assets, Revenue",
    "Contracts, Performance obligations, Transaction price, Allocation, Revenue recognition",
    "Cash, Payables, Taxes, Assets, Receivables",
    "Credits, Posting, Trial balance, Adjustments, Reporting"
  ],
    category: "concept",
  explanation: "The correct answer is A because CPTAR is the standard 5-step revenue recognition model. It represents: Contracts → Performance obligations → Transaction price → Allocation → Revenue recognition."
},
{
  q: "Which statement best describes accrual-basis accounting?",
  a: "C",
  o: [
    "Records only cash received and cash paid during a period",
    "Ignores non-cash transactions until cash is exchanged",
    "Records transactions in the period they occur, even if cash is not exchanged",
    "Recognizes revenue only when cash is received and expenses when cash is paid"
  ],
      category: "concept",
  explanation: "The correct answer is C because accrual-basis accounting records economic events when they occur, not when cash is exchanged. This follows the revenue recognition and expense recognition principles."
},

{
  q: "Which best describes accruals?",
  a: "A",
  o: [
    "Revenues or expenses recognized before cash is exchanged",
    "Revenues or expenses recognized only when cash is received",
    "Expenses recorded only at year-end closing",
    "Adjustments made only for depreciation"
  ],
    category: "concept",
  explanation: "The correct answer is A because accruals are revenues or expenses recognized before cash is exchanged, meaning recognition occurs earlier than cash movement."
},

{
  q: "Which statement best describes accrued expenses?",
  a: "B",
  o: [
    "Expenses paid in advance before they are incurred",
    "Expenses incurred but not yet paid or recorded",
    "Expenses recorded only when cash is paid",
    "Expenses that are never recorded under accrual accounting"
  ],
    category: "concept",
  explanation: "The correct answer is B because accrued expenses are obligations that have been incurred but not yet paid or recorded."
},

{
  q: "Which statement best describes accrued revenues?",
  a: "D",
  o: [
    "Revenues received in cash before services are performed",
    "Revenues recorded only when cash is received",
    "Revenues that are permanently deferred",
    "Revenues earned but not yet received or recorded"
  ],
    category: "concept",
  explanation: "The correct answer is D because accrued revenues are revenues earned through services performed but not yet received in cash or recorded."
},

{
  q: "What is an adjusted trial balance?",
  a: "C",
  o: [
    "A list of accounts before any transactions are recorded",
    "A list of only revenue and expense accounts after closing",
    "A list of accounts and balances after adjusting entries are made",
    "A worksheet used only for cash transactions"
  ],
      category: "concept",
  explanation: "The correct answer is C because an adjusted trial balance is prepared after adjusting entries to ensure all account balances are correct before financial statements are prepared."
},

{
  q: "What is the purpose of adjusting entries?",
  a: "A",
  o: [
    "To ensure revenue and expense recognition principles are followed",
    "To close temporary accounts to retained earnings",
    "To record only cash transactions",
    "To eliminate all liabilities from the books"
  ],
    category: "concept",
  explanation: "The correct answer is A because adjusting entries ensure that revenues and expenses are recognized in the correct accounting period."
},

{
  q: "What is book value?",
  a: "B",
  o: [
    "Market value minus cash on hand",
    "Cost of an asset minus accumulated depreciation",
    "Original purchase price plus depreciation",
    "Revenue minus expenses"
  ],
    category: "concept",
  explanation: "The correct answer is B because book value equals the cost of a depreciable asset minus its accumulated depreciation."
},

{
  q: "Which statement best describes cash-basis accounting?",
  a: "C",
  o: [
    "Records revenues when earned and expenses when incurred",
    "Ignores all non-cash transactions",
    "Records revenues only when cash is received and expenses when cash is paid",
    "Matches expenses with revenues in the same period"
  ],
    category: "concept",
  explanation: "The correct answer is C because cash-basis accounting recognizes revenues and expenses only when cash changes hands."
},

{
  q: "What is the purpose of closing entries?",
  a: "D",
  o: [
    "To adjust asset accounts at year-end",
    "To record cash transactions only",
    "To prepare an adjusted trial balance",
    "To transfer temporary account balances to retained earnings"
  ],
    category: "concept",
  explanation: "The correct answer is D because closing entries reset temporary accounts by transferring their balances to retained earnings."
},

{
  q: "What is a contra asset account?",
  a: "A",
  o: [
    "An account that reduces the balance of a related asset account",
    "An account that increases liabilities",
    "An account used only for revenues",
    "An account that replaces retained earnings"
  ],
    category: "concept",
  explanation: "The correct answer is A because a contra asset account is paired with an asset account and reduces its balance, such as accumulated depreciation."
},

{
  q: "Which statement best describes deferrals?",
  a: "B",
  o: [
    "Revenues and expenses recorded only when cash is received",
    "Revenues or expenses recognized after cash is exchanged",
    "Expenses never recorded under accrual accounting",
    "Only revenue adjustments at year-end"
  ],
   category: "concept",
  explanation: "The correct answer is B because deferrals involve cash being exchanged first, with recognition occurring later."
},

{
  q: "What is depreciation?",
  a: "C",
  o: [
    "The increase in value of an asset over time",
    "A cash payment for equipment",
    "The allocation of an asset’s cost over its useful life",
    "A method of closing accounts"
  ],
    category: "concept",
  explanation: "The correct answer is C because depreciation allocates the cost of a long-term asset over its useful life."
},

{
  q: "What is earnings management?",
  a: "D",
  o: [
    "Recording only cash transactions",
    "Eliminating all expenses from financial statements",
    "Closing all revenue accounts early",
    "Timing revenues and expenses to influence reported net income"
  ],
    category: "concept",
  explanation: "The correct answer is D because earnings management involves adjusting timing of revenues and expenses to influence reported income."
},

{
  q: "What is the expense recognition principle?",
  a: "A",
  o: [
    "Expenses should be matched with revenues in the period they help generate those revenues",
    "Expenses are recorded only when cash is paid",
    "Expenses are never adjusted at period-end",
    "Expenses are recorded only in closing entries"
  ],
    category: "concept",
  explanation: "The correct answer is A because expenses must be recognized in the same period as the revenues they help generate."
},

{
  q: "What is a fiscal year?",
  a: "B",
  o: [
    "Any 6-month reporting period",
    "An accounting period of one year",
    "A period based only on cash flow cycles",
    "A period used only for tax reporting"
  ],
    category: "concept",
  explanation: "The correct answer is B because a fiscal year is any one-year accounting period used for reporting purposes."
},

{
  q: "What is Income Summary?",
  a: "C",
  o: [
    "A permanent asset account",
    "A revenue account used daily",
    "A temporary account used in the closing process",
    "A liability account for revenues earned"
  ],
    category: "concept",
  explanation: "The correct answer is C because Income Summary is a temporary account used to close revenues and expenses."
},

{
  q: "What is the periodicity assumption?",
  a: "D",
  o: [
    "Businesses must report only cash transactions",
    "Financial statements are prepared only at liquidation",
    "All revenues must be recorded daily",
    "The life of a business can be divided into artificial time periods"
  ],
    category: "concept",
  explanation: "The correct answer is D because the periodicity assumption allows business activity to be divided into reporting periods."
},

{
  q: "What are permanent accounts?",
  a: "A",
  o: [
    "Balance sheet accounts carried forward to the next period",
    "Accounts closed at the end of each month",
    "Only revenue accounts",
    "Only expense accounts"
  ],
    category: "concept",
  explanation: "The correct answer is A because permanent accounts are not closed and carry balances forward, such as assets, liabilities, and equity."
},

{
  q: "What is a post-closing trial balance?",
  a: "B",
  o: [
    "A list of all temporary accounts after adjusting entries",
    "A list of permanent accounts after closing entries",
    "A worksheet used for depreciation",
    "A schedule of cash flows"
  ],
    category: "concept",
  explanation: "The correct answer is B because a post-closing trial balance includes only permanent accounts after closing entries are posted."
},

{
  q: "What are prepaid expenses?",
  a: "C",
  o: [
    "Expenses incurred and immediately recorded",
    "Expenses never recorded under accrual accounting",
    "Expenses paid in advance before they are used",
    "Expenses recorded only at closing"
  ],
    category: "concept",
  explanation: "The correct answer is C because prepaid expenses are payments made before the expense is incurred or consumed."
},

{
  q: "What does quality of earnings refer to?",
  a: "D",
  o: [
    "Total cash flow generated by operations",
    "Net income after taxes only",
    "The speed of earnings reporting",
    "The transparency and reliability of financial reporting information"
  ],
   category: "concept",
  explanation: "The correct answer is D because quality of earnings reflects how transparent and reliable reported earnings are."
},

{
  q: "What is the revenue recognition principle?",
  a: "A",
  o: [
    "Revenue is recognized when performance obligations are satisfied",
    "Revenue is recognized only when cash is received",
    "Revenue is recognized at year-end only",
    "Revenue is recognized when expenses are paid"
  ],
  category: "concept",
  explanation: "The correct answer is A because revenue is recognized when the company satisfies its performance obligations."
},

{
  q: "What is a reversing entry?",
  a: "B",
  o: [
    "An entry that closes revenue accounts",
    "An entry at the start of a new period that reverses a prior adjusting entry",
    "An entry that records depreciation",
    "An entry that eliminates liabilities"
  ],
  category: "concept",
  explanation: "The correct answer is B because reversing entries are made at the beginning of a new period to reverse certain adjusting entries."
},

{
  q: "What are temporary accounts?",
  a: "C",
  o: [
    "Balance sheet accounts carried forward indefinitely",
    "Accounts that are never closed",
    "Revenue, expense, and dividend accounts closed at period-end",
    "Only asset accounts used in closing"
  ],
  category: "concept",
  explanation: "The correct answer is C because temporary accounts are closed to retained earnings at the end of the period."
},

{
  q: "What are unearned revenues?",
  a: "D",
  o: [
    "Revenues earned and received immediately",
    "Expenses paid in advance",
    "Assets created by cash sales",
    "Cash received before services are performed, creating a liability"
  ],
  category: "concept",
  explanation: "The correct answer is D because unearned revenues represent cash received before services are provided, creating a liability."
},

{
  q: "What is useful life?",
  a: "A",
  o: [
    "The estimated period an asset is expected to be used in operations",
    "The total revenue generated by an asset",
    "The market value of an asset",
    "The depreciation method used"
  ],
  category: "concept",
  explanation: "The correct answer is A because useful life refers to how long a depreciable asset is expected to be used."
},

{
  q: "What is a worksheet in accounting?",
  a: "B",
  o: [
    "A permanent ledger account",
    "A multi-column tool used in adjusting and preparing financial statements",
    "A cash-only record system",
    "A closing entry summary sheet"
  ],
  category: "concept",
  explanation: "The correct answer is B because a worksheet is a tool used to organize adjustments and prepare financial statements."
},
{
  q: "Which statement best describes the periodicity assumption?",
  a: "C",
  o: [
    "Companies should recognize revenue in the accounting period in which services are performed",
    "Companies should match expenses with revenues",
    "The economic life of a business can be divided into artificial time periods",
    "The fiscal year must match the calendar year"
  ],
  category: "concept",
  explanation: "The correct answer is C because the periodicity assumption states that a business’s economic life can be divided into artificial time periods for reporting purposes. Choice A describes the revenue recognition principle. Choice B describes the expense recognition principle (matching). Choice D is incorrect because the fiscal year does not need to match the calendar year."
},

{
  q: "Which principle dictates that expenses should be recorded in the same period as the revenues they help generate?",
  a: "A",
  o: [
    "Expense recognition principle",
    "Historical cost principle",
    "Periodicity assumption",
    "Revenue recognition principle"
  ],
  category: "concept",
  explanation: "The correct answer is A because the expense recognition principle requires that expenses be matched with the revenues they help generate. Choice B is incorrect because historical cost deals with recording assets at acquisition cost. Choice C refers to dividing time into periods. Choice D relates to when revenue is recognized, not expenses."
},
{
  q: "Which statement best describes accrual-basis accounting?",
  a: "A",
  o: [
    "Companies record events that change financial statements in the period they occur, even if cash is not exchanged",
    "Companies recognize revenue only when cash is received",
    "Companies record expenses only when cash is paid",
    "Companies delay all recognition until year-end cash settlement"
  ],
  category: "concept",
  explanation: "The correct answer is A because accrual-basis accounting records transactions in the period they occur regardless of cash exchange. This contrasts with cash-basis accounting. Choice B and C describe cash-basis accounting. Choice D is incorrect because accrual accounting does not delay recognition until cash settlement."
},

{
  q: "Which statement best describes cash-basis accounting?",
  a: "D",
  o: [
    "Companies record transactions when they occur regardless of cash flow",
    "Companies match expenses with revenues in the same period",
    "Companies recognize revenue when performance obligations are satisfied",
    "Companies record revenue only when cash is received and expenses only when cash is paid"
  ],
  category: "concept",
  explanation: "The correct answer is D because cash-basis accounting records revenue and expenses only when cash is exchanged. Choices A, B, and C describe accrual-basis accounting principles."
},

{
  q: "What is the main purpose of adjusting entries?",
  a: "D",
  o: [
    "To ensure expenses are recognized in the period they are incurred",
    "To ensure revenues are recorded when performance obligations are satisfied",
    "To ensure account balances are correct at period-end",
    "All of the answer choices are correct"
  ],
  category: "concept",
  explanation: "The correct answer is D because adjusting entries ensure proper expense recognition, revenue recognition, and accurate account balances at period-end. Each of choices A, B, and C is individually correct, making D the best answer."
},

{
  q: "Which of the following is NOT a major category of adjusting entries?",
  a: "D",
  o: [
    "Prepaid expenses",
    "Accrued revenues",
    "Accrued expenses",
    "Unearned expenses"
  ],
  category: "concept",
  explanation: "The correct answer is D because 'unearned expenses' is not a category of adjusting entries. The major categories are prepaid expenses, accrued revenues, and accrued expenses."
},
{
  q: "Which statement best describes the adjustment for unearned revenues?",
  a: "A",
  o: [
    "Decrease liabilities and increase revenues",
    "Increase liabilities and increase revenues",
    "Increase assets and increase revenues",
    "Decrease revenues and decrease assets"
  ],
  category: "concept",
  explanation: "The correct answer is A because when unearned revenue is earned, the liability is reduced and revenue is recognized. This reflects revenue recognition upon satisfaction of performance obligations."
},

{
  q: "Which statement best describes the adjustment for prepaid expenses?",
  a: "C",
  o: [
    "Decrease assets and increase revenues",
    "Decrease expenses and increase assets",
    "Decrease assets and increase expenses",
    "Decrease revenues and increase assets"
  ],
  category: "concept",
  explanation: "The correct answer is C because prepaid expenses become used over time, causing an asset decrease and an expense increase in accordance with expense recognition principles."
},

{
  q: "Which statement best describes the adjustment for accrued revenues?",
  a: "B",
  o: [
    "Increase assets and increase liabilities",
    "Increase assets and increase revenues",
    "Decrease assets and decrease revenues",
    "Decrease liabilities and increase revenues"
  ],
  category: "concept",
  explanation: "The correct answer is B because accrued revenues increase both an asset (such as Accounts Receivable) and revenue when services have been performed but not yet billed or collected."
},

{
  q: "Which statement is incorrect concerning the adjusted trial balance?",
  a: "C",
  o: [
    "It proves equality of total debits and credits after adjustments",
    "It is used to prepare financial statements",
    "It does not list temporary accounts",
    "It is prepared after adjusting entries are journalized and posted"
  ],
  category: "concept",
  explanation: "The correct answer is C because the adjusted trial balance does include temporary accounts. The other statements correctly describe its purpose and timing in the accounting cycle."
},

{
  q: "Which account will have a zero balance after closing entries are completed?",
  a: "A",
  o: [
    "Service Revenue",
    "Supplies",
    "Prepaid Insurance",
    "Accumulated Depreciation"
  ],
  category: "concept",
  explanation: "The correct answer is A because Service Revenue is a temporary account that is closed to Income Summary and then Retained Earnings, resulting in a zero balance. The other accounts are permanent accounts and are not closed."
},

{
  q: "Which accounts appear in the post-closing trial balance?",
  a: "A",
  o: [
    "Permanent accounts only",
    "Temporary accounts only",
    "Expense accounts only",
    "None of the answer choices is correct"
  ],
  category: "concept",
  explanation: "The correct answer is A because the post-closing trial balance includes only permanent accounts. Temporary accounts are closed to Retained Earnings and therefore do not appear."
}
];