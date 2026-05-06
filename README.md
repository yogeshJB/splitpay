# SplitPay - Premium Expense Sharing Application

SplitPay is a full-stack expense sharing application built with the MEAN stack (MySQL, Express, Angular, Node.js). It helps friends track shared expenses and simplifies the process of "who owes whom".

## Features

- **User Management**: Create and view detailed profiles for each friend.
- **Dynamic Splits**:
  - **EQUAL**: Split expenses evenly among participants.
  - **EXACT**: Specify the exact amount each person owes.
  - **PERCENT**: Split by percentage (validates total sum is 100%).
- **Smart Rounding**: Automatically assigns decimal remainders to the first person to ensure accurate balances.
- **Balance Tracking**:
  - Global dashboard showing net balances between all users.
  - Individual user pages showing specific debts and payment history.
- **Premium UI**: Modern dark theme with glassmorphism effects and responsive design.

## Tech Stack

- **Frontend**: Angular 16, NgRx (State Management), Lucide Icons.
- **Backend**: Node.js, Express, Sequelize (ORM).
- **Database**: MySQL.
- **State Management**: NgRx Store, Effects, and Selectors.

## Setup Instructions

### Prerequisites
- Node.js (v16.20.2 used in development)
- MySQL Server

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`.
3. Configure `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=expense_sharing_db
   ```
4. Run the setup script to create the database: `node setup_db.js`.
5. Start the server: `node server.js`.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.
4. Open `http://localhost:4200` in your browser.

## Split Scenarios Tested

### Scenario 1: Equal Split
Input: `User1 1000 4 User1 User2 User3 User4 EQUAL`
Result: Everyone owes Rs. 250 to User1.

### Scenario 2: Exact Split
Input: `User1 1250 2 User2 User3 EXACT 370 880`
Result: User2 owes 370, User3 owes 880.

### Scenario 3: Percent Split
Input: `User4 1200 4 User1 User2 User3 User4 PERCENT 40 20 20 20`
Result: User1 owes 480, User2 owes 240, User3 owes 240.

---
Developed by Antigravity AI
