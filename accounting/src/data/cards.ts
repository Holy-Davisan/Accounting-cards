import { Card } from "../types";

/**
 * FSRS (Free Spaced Repetition System) Implementation Notes:
 *
 * To implement a functional FSRS system in the future, each card needs additional metadata:
 *
 * Required FSRS Properties (add to Card type):
 * - reviews: Array<{date: Date, rating: 1-4}> // Review history with ratings
 * - difficulty: number // 0-1 scale, starts at ~0.3, adjusts based on performance
 * - stability: number // Days until 90% recall probability, starts at ~1
 * - retrievability: number // Current recall probability (0-1)
 * - lastReview: Date // When card was last reviewed
 * - nextReview: Date // When card should be reviewed next
 * - interval: number // Current interval in days
 * - repetitions: number // Number of successful reviews
 *
 * FSRS Algorithm Flow:
 * 1. On review, calculate new difficulty based on rating (1=hard, 4=easy)
 * 2. Update stability using FSRS formula: S = S * (difficulty_factor) * (rating_factor)
 * 3. Calculate next interval: I = S * (retrievability_target)
 * 4. Schedule next review date
 *
 * Rating Scale (1-4):
 * 1 = Complete blackout (wrong answer)
 * 2 = Incorrect but remembered on seeing answer
 * 3 = Correct with serious difficulty
 * 4 = Perfect response
 *
 * This would replace the current simple scoring system with intelligent scheduling.
 */

export const cards: Card[] = [
  {
    q: "How many main financial statements exist?",
    a: "C",
    o: ["2", "3", "4", "5"],
  },
  {
    q: "Which is NOT a financial statement?",
    a: "D",
    o: ["Balance sheet", "Income statement", "Cash flow statement", "Marketing report"],
  },
  {
    q: "Balance sheet shows what?",
    a: "B",
    o: ["Company future plans", "Point-in-time financial position", "Daily sales", "Stock price"],
  },
  {
    q: "Balance sheet equation is…",
    a: "B",
    o: [
      "Assets = Revenue - Expenses",
      "Assets = Liabilities + Equity",
      "Cash = Profit + Debt",
      "Equity = Sales - Costs",
    ],
  },
  {
    q: "Income statement shows…",
    a: "B",
    o: ["Cash at one moment", "Performance over time", "Assets owned", "Shareholder list"],
  },
  {
    q: "Statement of cash flows explains…",
    a: "B",
    o: ["Stock price changes", "Why cash increased or decreased", "Employee performance", "Product pricing"],
  },
  {
    q: "Statement of equity tracks…",
    a: "B",
    o: ["Inventory changes", "Owner value changes over time", "Daily expenses", "Customer sales"],
  },
  {
    q: "Balance sheet is measured at…",
    a: "B",
    o: ["A time period", "A single point in time", "A forecast", "A stock price"],
  },
  {
    q: "Assets represent…",
    a: "A",
    o: ["Resources the company owns", "Money owed by owners", "Company expenses", "Future stock value"],
  },
  {
    q: "Operating activity includes…",
    a: "A",
    o: ["Paying suppliers and customers", "Issuing stock", "Buying buildings", "Paying dividends only"],
  },
  {
    q: "Financing activity includes…",
    a: "C",
    o: ["Buying inventory", "Paying employees", "Borrowing money or issuing stock", "Selling goods"],
  },
  {
    q: "Investing activity includes…",
    a: "C",
    o: ["Daily operations", "Debt repayment only", "Buying long-term assets", "Customer payments"],
  },
  {
    q: "Interest payments are classified as…",
    a: "C",
    o: ["Investing", "Financing", "Operating", "Equity"],
  },
  {
    q: "Dividend payments belong to…",
    a: "B",
    o: ["Operating", "Financing", "Investing", "Assets"],
  },
  {
    q: "Repaying loan principal is…",
    a: "B",
    o: ["Operating", "Financing", "Investing", "Revenue"],
  },
  {
    q: "Buying equipment is…",
    a: "C",
    o: ["Operating", "Financing", "Investing", "Expense"],
  },
  {
    q: "Why interest is operating?",
    a: "D",
    o: [
      "Random rule",
      "Because accountants like pain",
      "It is an asset",
      "It is tied to income statement expense",
    ],
  },
  {
    q: "Most company transactions are…",
    a: "C",
    o: ["Investing", "Financing", "Operating", "Equity"],
  },
  {
    q: "Income tax expense belongs on which financial statement?",
    a: "Income Statement",
    o: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Changes in Equity"],
  },
  {
    q: "Inventory belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Income Statement", "Balance Sheet", "Retained Earnings Statement", "None of the above"],
  },
  {
    q: "Accounts payable belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Cost of Goods Sold"],
  },
  {
    q: "Retained earnings belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Balance Sheet", "Income Statement", "Sales Revenue", "Interest Expense"],
  },
  {
    q: "Equipment belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Income Statement", "Balance Sheet", "Cost of Goods Sold", "Sales Revenue"],
  },
  {
    q: "Sales revenue belongs on which financial statement?",
    a: "Income Statement",
    o: ["Balance Sheet", "Income Statement", "Accounts Receivable", "Inventory"],
  },
  {
    q: "Cost of goods sold belongs on which financial statement?",
    a: "Income Statement",
    o: ["Balance Sheet", "Income Statement", "Retained Earnings", "Equipment"],
  },
  {
    q: "Common stock belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Income Statement", "Balance Sheet", "Sales Revenue", "Interest Expense"],
  },
  {
    q: "Accounts receivable belongs on which financial statement?",
    a: "Balance Sheet",
    o: ["Income Statement", "Balance Sheet", "Cost of Goods Sold", "Income Tax Expense"],
  },
  {
    q: "Interest expense belongs on which financial statement?",
    a: "Income Statement",
    o: ["Balance Sheet", "Income Statement", "Common Stock", "Inventory"],
  },
  {
    q: "The basic Accounting Equation is...",
    a: "Assets = Liabilities + Equity",
    o: [
      "Assets = Revenue - Expenses",
      "Assets = Liabilities + Equity",
      "Cash = Profit + Debt",
      "Equity = Sales - Costs",
    ],
  },
  {
    q: "Company buy long-life trailers. What activity give cash?",
    a: "Financing",
    o: ["Operating", "Investing", "Financing", "Administrative"],
  },
  {
    q: "Company repay borrowed money. What activity is this?",
    a: "Financing",
    o: ["Operating", "Financing", "Investing", "Liability"],
  },
  {
    q: "Company in money trouble. Who get paid first?",
    a: "Bondholder",
    o: [
      "Stockholder",
      "Bondholder",
      "Customer who bought goods",
      "Buyer of fixed assets"
    ],
  },
  {
    q: "Say financial statement follow GAAP. What called?",
    a: "Unqualified opinion",
    o: [
      "Tax report",
      "Audit opinion about GAAP",
      "Revenue forecast",
      "Cash budget"
    ],
  },
  {
    q: "Business raise money by selling shares. What is it?",
    a: "Corporation",
    o: ["Sole proprietorship", "Corporation", "Partnership", "LLC expense"],
  },
  {
    q: "Money from investors who buy stock called what?",
    a: "Common stock (equity financing)",
    o: ["Accounts payable", "Common stock", "Revenue", "Retained earnings"],
  },
  {
    q: "Money owed to suppliers called what?",
    a: "Accounts payable",
    o: ["Accounts receivable", "Accounts payable", "Inventory", "Expense"],
  },
  {
    q: "Money customers owe company called what?",
    a: "Accounts receivable",
    o: ["Accounts receivable", "Cash", "Revenue", "Stock"],
  },
  {
    q: "Company owes money to supplier. Supplier is what?",
    a: "Creditor",
    o: ["Investor", "Creditor", "Owner", "Employee"],
  },
  {
    q: "Business with tax perks + limited liability called what?",
    a: "Corporation (or LLC)",
    o: ["Sole proprietorship", "Corporation", "Partnership", "Franchise"],
  },
  {
    q: "Person who puts money into common stock called what?",
    a: "Shareholder",
    o: ["Customer", "Shareholder", "Supplier", "Manager"],
  },
  {
    q: "Business owned by 2+ people, no stock issued called what?",
    a: "Partnership",
    o: ["Corporation", "Partnership", "Co-op", "LLC"],
  },
  {
    q: "Money company owes supplier (accounts payable) is what?",
    a: "Liability",
    o: ["Asset", "Liability", "Revenue", "Expense"],
  },
  {
    q: "Money customers owe company (accounts receivable) is what?",
    a: "Asset",
    o: ["Asset", "Liability", "Revenue", "Expense"],
  },
  {
    q: "Big long-term stuff like machines (equipment) is what?",
    a: "Asset",
    o: ["Asset", "Expense", "Revenue", "Liability"],
  },
  {
    q: "Money earned from selling goods (sales revenue) is what?",
    a: "Revenue",
    o: ["Asset", "Revenue", "Expense", "Liability"],
  },
  {
    q: "Money earned from providing service (service revenue) is what?",
    a: "Revenue",
    o: ["Expense", "Liability", "Revenue", "Asset"],
  },
  {
    q: "Stuff company plans to sell (inventory) is what?",
    a: "Asset",
    o: ["Asset", "Expense", "Revenue", "Liability"],
  },
  {
    q: "Long-term loan owed by company (mortgage payable) is what?",
    a: "Liability",
    o: ["Asset", "Revenue", "Expense", "Liability"],
  },
  {
    q: "Paper/pencils/supplies used up (supplies expense) is what?",
    a: "Expense",
    o: ["Asset", "Liability", "Expense", "Revenue"],
  },
  {
    q: "Paying rent to use space (rent expense) is what?",
    a: "Expense",
    o: ["Revenue", "Expense", "Asset", "Liability"],
  },
  {
    q: "Pay workers salary (salaries and wages expense) is what?",
    a: "Expense",
    o: ["Asset", "Revenue", "Expense", "Liability"],
  },
];
