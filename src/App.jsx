import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Register from './pages/Register';
import AddTransaction from './pages/AddTransaction';
import Home from './pages/Home';
import Assets from './pages/Assets';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Insights from './pages/Insights';
import Login from './pages/Login';
import MorePersonal from './pages/MorePersonal';
import MoreBusiness from './pages/MoreBusiness';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<PrivateRoute element={Home} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add_transaction" element={<PrivateRoute element={AddTransaction} />} />
            <Route path="/assets" element={<PrivateRoute element={Assets} />} />
            <Route path="/budget" element={<PrivateRoute element={Budget} />} />
            <Route path="/expenses" element={<PrivateRoute element={Expenses} />} />
            <Route path="/income" element={<PrivateRoute element={Income} />} />
            <Route path="/insights" element={<PrivateRoute element={Insights} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/p-more" element={<PrivateRoute element={MorePersonal} />} />
            <Route path="/b-more" element={<PrivateRoute element={MoreBusiness} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
