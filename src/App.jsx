import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './pages/Register';
import AddTransaction from "./pages/AddTransaction"

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/add_transaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
