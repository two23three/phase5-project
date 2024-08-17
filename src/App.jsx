import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Register from './pages/Register';
import AddIncomeTransaction from './components/AddIncomeTransaction';
import AddExpenseTransaction from './components/AddExpenseTransaction';
import Home from './pages/Home';
import Assets from './pages/Assets';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Insights from './pages/Insights';
import Login from './pages/Login';
import More from './pages/More';
import StatusBar from './pages/StatusBar';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import TransactionTypePopup from './components/TransactionTypePopup';
import CategoryCreationPopup from './components/CategoryCreationPopup';
import Navbar from './components/Navbar';

import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  const [showTransactionTypePopup, setShowTransactionTypePopup] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const handleAddTransactionClick = () => {
    console.log('Add Transaction button clicked');
    setShowTransactionTypePopup(true);
  };

  const handleChooseTransactionType = (type) => {
    setShowTransactionTypePopup(false);
    if (type === 'income') {
      setShowAddIncome(true);
    } else {
      setShowCategoryPopup(true);
    }
  };

  const handleCreateCategory = (newCategory) => {
    setShowCategoryPopup(false);
    window.location.href = '/add_expense_transaction';
  };

  return (
    <AuthProvider>
      <Router>
        <AppContent
          showTransactionTypePopup={showTransactionTypePopup}
          setShowTransactionTypePopup={setShowTransactionTypePopup}
          handleChooseTransactionType={handleChooseTransactionType}
          showAddIncome={showAddIncome}
          setShowAddIncome={setShowAddIncome}
          showAddExpense={showAddExpense}
          setShowAddExpense={setShowAddExpense}
          showCategoryPopup={showCategoryPopup}
          setShowCategoryPopup={setShowCategoryPopup}
          handleCreateCategory={handleCreateCategory}
          handleAddTransactionClick={handleAddTransactionClick}
        />
      </Router>
    </AuthProvider>
  );
}

function AppContent({
  showTransactionTypePopup,
  setShowTransactionTypePopup,
  handleChooseTransactionType,
  showAddIncome,
  setShowAddIncome,
  showAddExpense,
  setShowAddExpense,
  showCategoryPopup,
  setShowCategoryPopup,
  handleCreateCategory,
  handleAddTransactionClick,
}) {
  const location = useLocation();
  const isNavbarVisible = !['/login', '/', '/register'].includes(location.pathname);
  const isStatusBarVisible = location.pathname !== '/add_expense_transaction';

  return (
    <div>
      {isStatusBarVisible && <StatusBar />}
      <Routes>
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add_income_transaction" element={<PrivateRoute element={AddIncomeTransaction} />} />
        <Route path="/add_expense_transaction" element={<PrivateRoute element={AddExpenseTransaction} />} />
        <Route path="/assets" element={<PrivateRoute element={Assets} />} />
        <Route path="/budget" element={<PrivateRoute element={Budget} />} />
        <Route path="/expenses" element={<PrivateRoute element={Expenses} />} />
        <Route path="/income" element={<PrivateRoute element={Income} />} />
        <Route path="/insights" element={<PrivateRoute element={Insights} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more" element={<PrivateRoute element={More} />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>

      {showTransactionTypePopup && (
        <TransactionTypePopup
          onClose={() => setShowTransactionTypePopup(false)}
          onChoose={handleChooseTransactionType}
        />
      )}

      {showAddIncome && (
        <AddIncomeTransaction onCancel={() => setShowAddIncome(false)} />
      )}

      {showCategoryPopup && (
        <CategoryCreationPopup
          onClose={() => setShowCategoryPopup(false)}
          onCreateCategory={handleCreateCategory}
        />
      )}

      {showAddExpense && (
        <AddExpenseTransaction onCancel={() => setShowAddExpense(false)} />
      )}

      {isNavbarVisible && <Navbar onAddTransactionClick={handleAddTransactionClick} />}
    </div>
  );
}

export default App;
