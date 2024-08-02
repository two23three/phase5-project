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
import More from './pages/More';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/add_transaction" element={<AddTransaction />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
