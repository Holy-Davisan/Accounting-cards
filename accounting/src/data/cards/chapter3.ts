import { Card } from "../../types";

export const cards: Card[] = [
  {
    q: "A company purchases equipment with cash. Which accounting concept requires both accounts to be updated?",
    a: "B",
    o: ["Trial balance","Double-entry system","Chart of accounts","Journalizing"],
    category: "exercise",
    explanation: "The correct answer is B, \"Double-entry system,\" because every transaction affects at least two accounts. When equipment is purchased with cash, the Equipment account increases while the Cash account decreases. Choice A is incorrect because a trial balance is used later to check whether debits equal credits. Choice C is incorrect because the chart of accounts is simply a list of account names. Choice D is incorrect because journalizing means recording transactions, not the rule requiring two accounts to change.",
  },
  {
    q: "Which accounting record initially captures transactions in chronological order before posting?",
    a: "C",
    o: ["General ledger","Trial balance","Journal","T-account"],
    category: "exercise",
    explanation: "The correct answer is C, \"Journal,\" because transactions are first recorded in chronological order in the journal before they are posted to ledger accounts. Choice A is incorrect because the general ledger organizes transactions by account rather than by date. Choice B is incorrect because a trial balance is prepared after posting to verify debit and credit balances. Choice D is incorrect because a T-account is only a visual aid used to analyze individual accounts.",
  },
  {
    q: "Which event would NOT normally be recorded as an accounting transaction?",
    a: "D",
    o: ["Paying rent","Receiving customer cash","Purchasing inventory on credit","Owner predicts future sales growth"],
    category: "exercise",
    explanation: "The correct answer is D, \"Owner predicts future sales growth,\" because predictions and expectations are not measurable financial transactions. Choice A is incorrect because paying rent involves an actual cash payment. Choice B is incorrect because receiving customer cash changes assets and must be recorded. Choice C is incorrect because purchasing inventory on credit creates both an asset and a liability that must be recorded.",
  },
  {
    q: "A chart of accounts is primarily used to:",
    a: "A",
    o: ["Provide a structured list of company accounts","Replace the general journal","Calculate trial balance totals","Eliminate posting errors"],
    category: "general",
    explanation: "The correct answer is A, \"Provide a structured list of company accounts,\" because the chart of accounts organizes all accounts used by a business. Choice B is incorrect because the general journal is still needed to record transactions. Choice C is incorrect because trial balance totals are calculated from ledger balances, not directly from the chart of accounts. Choice D is incorrect because the chart of accounts helps organization but does not prevent all posting errors.",
  },
  {
    q: "In accounting terminology, a debit refers to:",
    a: "B",
    o: ["The right side of an account","The left side of an account","An increase in liabilities only","A decrease in assets only"],
    category: "general",
    explanation: "The correct answer is B, \"The left side of an account,\" because debits are always recorded on the left side in double-entry accounting. Choice A is incorrect because the right side is the credit side. Choice C is incorrect because debits can increase assets and expenses, not just liabilities. Choice D is incorrect because debits often increase assets rather than decrease them.",
  },
  {
    q: "What is the main purpose of posting?",
    a: "C",
    o: ["Recording transactions chronologically","Preparing financial statements","Transferring journal amounts to ledger accounts","Balancing debits and credits"],
    category: "vocab",
    explanation: "The correct answer is C, \"Transferring journal amounts to ledger accounts,\" because posting moves information from the journal into the appropriate ledger accounts. Choice A is incorrect because recording transactions chronologically is the purpose of journalizing. Choice B is incorrect because financial statements are prepared after posting and adjusting entries. Choice D is incorrect because balancing debits and credits is the purpose of preparing a trial balance.",
  },
  {
    q: "Which statement best distinguishes a general journal from a general ledger?",
    a: "D",
    o: ["The ledger records transactions first","The journal stores only asset accounts","Both serve identical purposes","The journal records transactions chronologically while the ledger organizes by account"],
    category: "general",
    explanation: "The correct answer is D because the general journal records transactions by date, while the general ledger groups transactions into individual accounts. Choice A is incorrect because transactions are first recorded in the journal, not the ledger. Choice B is incorrect because journals contain all types of accounts, not only assets. Choice C is incorrect because the journal and ledger serve different functions in the accounting process.",
  },
  {
    q: "A trial balance is mainly used to:",
    a: "A",
    o: ["Check whether total debits equal total credits","Record transactions in order","List only expense accounts","Replace the double-entry system"],
    category: "general",
    explanation: "The correct answer is A because a trial balance checks whether the total debits equal the total credits after posting. Choice B is incorrect because transactions are recorded in chronological order in the journal. Choice C is incorrect because a trial balance includes all account types, not just expenses. Choice D is incorrect because the trial balance supports the double-entry system rather than replacing it.",
  },
  {
    q: "Which accounting tool visually separates debit and credit entries within one account?",
    a: "C",
    o: ["Chart of accounts","General journal","T-account","Trial balance"],
    category: "general",
    explanation: "The correct answer is C, \"T-account,\" because it visually shows debits on the left side and credits on the right side of a single account. Choice A is incorrect because the chart of accounts is only a listing of accounts. Choice B is incorrect because the general journal records transactions chronologically rather than visually separating one account. Choice D is incorrect because a trial balance summarizes account balances but does not display debit and credit activity within one account.",
  },
  {
    q: "Why is an accounting information system important to organizations?",
    a: "B",
    o: ["It guarantees profits","It collects and communicates financial information to decision-makers","It eliminates accounting errors automatically","It replaces financial statements entirely"],
    category: "concept",
    explanation: "The correct answer is B because an accounting information system gathers, processes, and communicates financial information that managers and other users need for decision-making. Choice A is incorrect because no system can guarantee profits. Choice C is incorrect because accounting systems can reduce errors but cannot eliminate them completely. Choice D is incorrect because financial statements are still necessary outputs of the system.",
  },
  {
    q: "If assets are $$120{,}000$ and liabilities are $$80{,}000$, what is equity according to the accounting equation $\\text{Assets} = \\text{Liabilities} + \\text{Equity}$?",
    a: "A",
    o: ["$$40{,}000$","$$200{,}000$","$$80{,}000$","$$120{,}000$"],
    category: "exercise",
    explanation: "The correct answer is A, \"$$40{,}000$,\" because equity equals assets minus liabilities. Using the accounting equation, $$120{,}000 - 80{,}000 = 40{,}000$$. Choice B is incorrect because it adds assets and liabilities instead of subtracting. Choice C is incorrect because it repeats the liabilities amount rather than calculating equity. Choice D is incorrect because it repeats the assets amount.",
  },
  {
    q: "Which of the following correctly represents net income using financial statement terms?",
    a: "D",
    o: ["$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$","$\\text{Gross Profit} = \\text{Revenue} + \\text{Expenses}$","$\\text{Cash Flow} = \\text{Operating Activities} - \\text{Investing Activities}$","$\\text{Net Income} = \\text{Revenue} - \\text{Expenses}$"],
    category: "general",
    explanation: "The correct answer is D because net income is calculated by subtracting expenses from revenue. Choice A is incorrect because it represents the accounting equation, not net income. Choice B is incorrect because gross profit equals revenue minus cost of goods sold, not revenue plus expenses. Choice C is incorrect because cash flow calculations are more complex and are not the formula for net income.",
  },
  {
  q: "The effects on the basic accounting equation of performing services for cash are to:",
  a: "B",
  o: [
    "increase assets and decrease stockholders' equity",
    "increase assets and increase stockholders' equity",
    "increase assets and increase liabilities",
    "increase liabilities and increase stockholders' equity"
  ],
  category: "general",
  explanation: "The correct answer is B because when services are performed for cash, assets increase and stockholders' equity increases through revenue. Choice A is incorrect because stockholders' equity does not decrease. Choice C is incorrect because liabilities are not affected. Choice D is incorrect because liabilities do not increase in this transaction."
},

{
  q: "Genesis Company buys a $900 machine on credit. This transaction will affect the:",
  a: "B",
  o: [
    "income statement only",
    "balance sheet only",
    "income statement and retained earnings statement only",
    "income statement, retained earnings statement, and balance sheet"
  ],
  category: "general",
  explanation: "The correct answer is B because purchasing equipment on credit increases assets and liabilities, which are balance sheet accounts. Choices A, C, and D are incorrect because no revenue or expense accounts are affected."
},

{
  q: "Which of the following events is not recorded in the accounting records?",
  a: "B",
  o: [
    "Equipment is purchased on account",
    "An employee is terminated",
    "A cash investment is made into the business",
    "Company pays dividend to stockholders"
  ],
  category: "general",
  explanation: "The correct answer is B because terminating an employee is not a measurable financial transaction. Choices A, C, and D are recorded because they involve financial effects on the company."
},

{
  q: "During 2025, Gibson Company assets decreased $50,000 and its liabilities decreased $90,000. Its stockholders’ equity therefore:",
  a: "A",
  o: [
    "increased $40,000",
    "decreased $140,000",
    "decreased $40,000",
    "increased $140,000"
  ],
  category: "general",
  explanation: "The correct answer is A because if assets decrease by $50,000 and liabilities decrease by $90,000, stockholders’ equity must increase by $40,000 to keep the accounting equation balanced. The other choices do not maintain the equation."
},

{
  q: "Which statement about an account is true?",
  a: "B",
  o: [
    "An account consists of a title, a debit side, and a ledger side",
    "An account is an individual accounting record of increases and decreases in specific asset, liability, and stockholders’ equity items",
    "There are separate accounts for specific assets and liabilities but only one account for stockholders’ equity items",
    "The left side of an account is the credit, or decrease, side"
  ],
  category: "general",
  explanation: "The correct answer is B because an account records increases and decreases in specific accounting items. Choice A is incorrect because accounts have debit and credit sides. Choice C is incorrect because stockholders’ equity has multiple accounts. Choice D is incorrect because the left side is the debit side."
},

{
  q: "Debits:",
  a: "C",
  o: [
    "increase both assets and liabilities",
    "decrease both assets and liabilities",
    "increase assets and decrease liabilities",
    "decrease assets and increase liabilities"
  ],
  category: "general",
  explanation: "The correct answer is C because debits increase asset accounts and decrease liability accounts. The other choices incorrectly describe debit effects."
},

{
  q: "A revenue account:",
  a: "D",
  o: [
    "is increased by debits",
    "is decreased by credits",
    "has a normal balance of a debit",
    "is increased by credits"
  ],
  category: "general",
  explanation: "The correct answer is D because revenues increase with credits and normally carry a credit balance. Choices A, B, and C incorrectly describe revenue account behavior."
},

{
  q: "Which accounts normally have debit balances?",
  a: "D",
  o: [
    "Assets, expenses, and revenues",
    "Assets, expenses, and retained earnings",
    "Assets, liabilities, and dividends",
    "Assets, dividends, and expenses"
  ],
  category: "general",
  explanation: "The correct answer is D because assets, dividends, and expenses normally carry debit balances. Revenues, retained earnings, and liabilities normally have credit balances."
},

{
  q: "Paying an account payable with cash affects the components of the accounting equation in the following way:",
  a: "D",
  o: [
    "Decreases stockholders’ equity and decreases liabilities",
    "Increases assets and decreases liabilities",
    "Decreases assets and increases stockholders’ equity",
    "Decreases assets and decreases liabilities"
  ],
  category: "general",
  explanation: "The correct answer is D because paying accounts payable decreases cash, an asset, and decreases accounts payable, a liability. The other choices incorrectly describe the effects."
},

{
  q: "Which of these statements about a journal is false?",
  a: "A",
  o: [
    "It contains only revenue and expense accounts",
    "It provides a chronological record of transactions",
    "It helps to locate errors because the debit and credit amounts for each entry can be readily compared",
    "It discloses in one place the complete effect of a transaction"
  ],
  category: "general",
  explanation: "The correct answer is A because journals contain all types of accounts, not only revenue and expense accounts. Choices B, C, and D are true statements about journals."
},

{
  q: "A ledger:",
  a: "C",
  o: [
    "contains only asset and liability accounts",
    "should show accounts in alphabetical order",
    "is a record of all accounts maintained by a company and their amounts",
    "provides a chronological record of transactions"
  ],
  category: "general",
  explanation: "The correct answer is C because a ledger contains all company accounts and their balances. Choice A is incorrect because all account types are included. Choice B is incorrect because accounts are grouped by type, not alphabetically. Choice D is incorrect because the journal provides the chronological record."
},

{
  q: "Posting:",
  a: "D",
  o: [
    "normally occurs before journalizing",
    "transfers ledger transaction data to the journal",
    "is an optional step in the recording process",
    "transfers journal entries to ledger accounts"
  ],
  category: "general",
  explanation: "The correct answer is D because posting transfers journal entry information into ledger accounts. Choice A is incorrect because posting occurs after journalizing. Choice B reverses the process. Choice C is incorrect because posting is required."
},
{
  q: `During 2025, Rain Corp. entered into the following transactions:\n\n1. Purchased equipment for $31,000 by issuing a note.\n2. Received $960 from tenant for rent.\n3. Paid $520 for supplies previously purchased on account.\n4. Performed services on account for $12,500.\n\nUsing tabular analysis, show the effect of each transaction on the accounting equation. Put explanations for changes to revenues or expenses in the right-hand margin. For retained earnings, use separate columns for revenues, expenses, and dividends if necessary. Use Illustration 3.4 as a model.\n\n$$\n\begin{array}{lcccccccccc}
\text{Assets} & = & \text{Liabilities} & + & \text{Stockholders' Equity}\\
\text{Cash} & + & \text{Receivable} & + & \text{Supplies} & + & \text{Equip.} & = & \text{Pay.} & + & \text{Pay.} & + & \text{Stock} & + & \text{Rev.} & - & \text{Exp.} & - & \text{Div.}
\end{array}
$$`,
  a: "A",
  o: [
    "Assets increase $43,940, liabilities increase $31,000, and stockholders’ equity increases $13,460",
    "Assets increase $43,940, liabilities increase $31,000, and stockholders’ equity increases $12,500",
    "Assets increase $43,940, liabilities increase $31,520, and stockholders’ equity increases $12,420",
    "Assets increase $43,940, liabilities increase $31,000, and stockholders’ equity increases $12,980"
  ],
  category: "exercise",
  explanation: "The correct answer is A because the combined transaction effects are: equipment +31,000, cash +960, supplies -520, and accounts receivable +12,500, so assets change by +43,940. In MathJax: $$\text{Assets change} = 31{,}000 + 960 - 520 + 12{,}500 = 43{,}940.$$ Liabilities increase by +31,000 from the note payable: $$\text{Liabilities change} = 31{,}000.$$ Revenues and expenses affect retained earnings: $$\text{Net effect on equity} = 12{,}500 + 960 - 520 = 13{,}460.$$ No dividends were paid."
},
{
  q: "Unorganized list: {investment, cash, ownership}. Which organized account structure correctly represents the transaction?",
  a: "A",
  o: [
    "Common Stock, Cash",
    "Cash, Common Stock",
    "Service Revenue, Accounts Receivable",
    "Accounts Payable, Equipment"
  ],
    category: "concept",
  explanation: "The correct answer is A because the raw transaction set {investment, cash, ownership} organizes into Common Stock, Cash using the right-to-left accounting structure. Algebraic form: if investment then Common Stock, Cash."
},

{
  q: "Unorganized list: {rent, cash, expense}. Which organized account structure correctly represents the transaction?",
  a: "B",
  o: [
    "Cash, Rent Expense",
    "Rent Expense, Cash",
    "Accounts Payable, Cash",
    "Equipment, Cash"
  ],
  category: "concept",
  explanation: "The correct answer is B because the raw transaction set {rent, cash, expense} organizes into Rent Expense, Cash. Algebraic form: if rent payment then Rent Expense, Cash."
},

{
  q: "Unorganized list: {services, receivable, revenue}. Which organized account structure correctly represents the transaction?",
  a: "C",
  o: [
    "Cash, Service Revenue",
    "Service Revenue, Accounts Receivable",
    "Accounts Receivable, Service Revenue",
    "Equipment, Accounts Receivable"
  ],
  category: "concept",
  explanation: "The correct answer is C because the raw transaction set {services, receivable, revenue} organizes into Accounts Receivable, Service Revenue. Algebraic form: if services on account then Accounts Receivable, Service Revenue."
},

{
  q: "Unorganized list: {equipment, payable, liability}. Which organized account structure correctly represents the transaction?",
  a: "D",
  o: [
    "Accounts Payable, Equipment",
    "Cash, Equipment",
    "Equipment, Cash",
    "Equipment, Accounts Payable"
  ],
  category: "concept",
  explanation: "The correct answer is D because the raw transaction set {equipment, payable, liability} organizes into Equipment, Accounts Payable. Algebraic form: if purchase on account then Equipment, Accounts Payable."
},
{
  q: "Unorganized set: {transaction, accounts, classification, balance rules, posting, summarizing}. Which system correctly describes the ordering logic of the double-entry accounting cycle (journal, ledger, trial balance)?",
  a: "C",
  o: [
    "Alphabetical account listing → journal → trial balance → ledger → financial statements",
    "Trial balance → journal → ledger → classification → transaction",
    "Transaction → journal → ledger → trial balance → financial statements",
    "Ledger → journal → transaction → trial balance → classification"
  ],
  category: "concept",
  explanation: "The correct answer is C because the double-entry system follows a strict transformation pipeline: transaction recognition → journalizing → posting to ledger → preparing trial balance → financial statement preparation. Mnemonic: 'TJLTF' (Transactions, Journal, Ledger, Trial balance, Financials)."
},

{
  q: "Unorganized set: {debit, credit, equality, dual effect, accounts}. Which system correctly defines the double-entry accounting principle?",
  a: "B",
  o: [
    "Each transaction affects only one account but must be balanced monthly",
    "Each transaction has equal debit and credit effects across at least two accounts",
    "Debits always increase equity and credits always increase assets",
    "Accounts are recorded only once in either the journal or ledger"
  ],
  category: "concept",
  explanation: "The correct answer is B because the double-entry system requires every transaction to have equal debit and credit effects, maintaining the accounting equation. Algebraic form: ΔAssets = ΔLiabilities + ΔEquity. Mnemonic: 'DEAD' (Dual Effect Always Debits = Credits)."
},

{
  q: "Unorganized set: {journal, chronological order, transactions, record keeping}. Which statement best describes the journal system?",
  a: "A",
  o: [
    "A record of balances used only at period end",
    "A list of accounts arranged by balance type",
    "A chronological record of transactions showing debit and credit effects",
    "A summary of ledger accounts used for financial statements"
  ],
  category: "concept",
  explanation: "The correct answer is A because the journal records transactions in chronological order with debit and credit effects shown together. Mnemonic: 'COLD' (Chronological Order, Ledger Deferred)."
},

{
  q: "Unorganized set: {accounts, balances, grouping, posting, classification}. Which system best describes the ledger?",
  a: "C",
  o: [
    "A chronological record of transactions in date order",
    "A temporary worksheet used only for adjustments",
    "A record of all accounts grouped by classification with running balances",
    "A statement of financial position prepared before transactions"
  ],
  category: "concept",
  explanation: "The correct answer is C because the ledger organizes all accounts with their balances after posting from the journal. It is not chronological; it is classified by account type. Mnemonic: 'LAG' (Ledger = Accounts Grouped)."
},

{
  q: "Unorganized set: {debits, credits, equality check, errors, totals}. Which system best describes a trial balance?",
  a: "D",
  o: [
    "A journal entry system used to record transactions",
    "A ledger posting mechanism used during transactions",
    "A financial statement reporting profit and loss",
    "A list of all ledger accounts with debit and credit totals used to verify equality"
  ],
  category: "concept",
  explanation: "The correct answer is D because the trial balance is used to verify that total debits equal total credits after posting from the ledger. Mnemonic: 'DETECT' (Debits Equal Totals Ensure Credit Test)."
}
];