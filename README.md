# Personal Finance Visualizer

A simple web application to track and visualize personal finances. This app allows users to manage their transactions, set monthly budgets, and visualize their spending patterns through charts.

## Features

### Transaction Management

- **Add, Edit, and Delete Transactions**: Users can add new transactions with details such as amount, date, and description. They can also edit or delete existing transactions.
- **Transaction List View**: A list view displaying all transactions, including details such as date, amount, and description.
- **Basic Form Validation**: Ensures that the necessary fields like amount, date, and description are correctly filled before submission.

### Charts and Visualizations

- **Monthly Expenses Bar Chart**: A bar chart displaying the total expenses per month.
- **Category-wise Pie Chart**: A pie chart showing how total expenses are distributed across different predefined categories (e.g., Food, Entertainment, Utilities).
- **Budget vs Actual Comparison**: A chart comparing the budgeted amount for each category against the actual spending.
- **Spending Insights**: A section showing total expenses, category breakdown, and recent transactions.

### Dashboard and Summary

- **Dashboard Overview**: A dashboard providing a snapshot of your finances with summary cards displaying:
  - Total Expenses
  - Category Breakdown
  - Most Recent Transactions

### Budgeting

- **Set Monthly Category Budgets**: Users can set and manage monthly budgets for categories like Food, Entertainment, and Utilities.
- **Track Budget vs Actual**: A chart comparing the user’s budget with actual spending for each category.

## Technologies Used

- **Frontend**: Next.js, React, shadcn/ui, Recharts
- **Backend**: MongoDB (for storing transaction data and budgets)
- **Design**: Tailwind CSS (for responsive and modern UI)

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (or use MongoDB Atlas for a cloud database solution)

### Steps to Set Up the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/finance-visualizer.git
   cd finance-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB:

   - If you're using a local MongoDB database, ensure it's running on `localhost:27017`.
   - For MongoDB Atlas, update the connection string in the `dbConfig` file with your cloud database details.

4. Run the development server:

   ```bash
   npm run dev
   ```

   The application should now be running at `http://localhost:3000`.

### Accessing the Application

Once the app is running, open your browser and navigate to `http://localhost:3000` to start using the Personal Finance Visualizer.

## Usage

- **Add/Edit/Delete Transactions**: Use the form to add new transactions and edit or delete existing ones.
- **View Monthly Expenses**: See your spending for each month visualized in the monthly expenses bar chart.
- **Set and Track Budgets**: Set a budget for each category and track how much you've spent compared to your budget.
- **View Spending Insights**: Get insights about your total expenses, category breakdown, and recent transactions.

## API Endpoints

### `/api/transactions`

- **GET**: Fetch all transactions.

  Example response:

  ```json
  [
    {
      "description": "Grocery shopping",
      "amount": 50,
      "date": "2024-02-15T00:00:00Z"
    },
    {
      "description": "Movie tickets",
      "amount": 20,
      "date": "2024-02-18T00:00:00Z"
    }
  ]
  ```
