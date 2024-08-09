import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add_transaction" element={<AddTransaction />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/p-more" element={<MorePersonal />} />
          <Route path="/b-more" element={<MoreBusiness />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
