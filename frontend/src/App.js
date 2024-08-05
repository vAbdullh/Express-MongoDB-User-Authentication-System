import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
// import Login from './pages/Login';
// import CreateAccount from './pages/CreateAccount';
// import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/createAccount" element={<CreateAccount />} /> */}
        {/* <Route path="/resetPassword" element={<ResetPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default App;