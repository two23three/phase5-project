import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChangeAccountDetails from './components/ChangeAccountDetails'
import ChangePassword from './components/ChangePassword'
import EditTransaction from './components/EditTransaction'
import LogOutPopUp from './components/LogOutPopUp'
import MpesaPopUp from './components/MpesaPopUp'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/changedetails" element={<ChangeAccountDetails />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/edittransaction" element={<EditTransaction/>} />
          <Route path="/logout" element={<LogOutPopUp />} />
          <Route path="/mpesa" element={<MpesaPopUp />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
